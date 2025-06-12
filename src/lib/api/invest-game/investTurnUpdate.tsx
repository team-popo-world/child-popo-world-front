import apiClient, { ApiError } from "../axios";

interface TurnData {
  started_at: string;
  ended_at: string;
  risk_level: string;
  current_point: number;
  before_value: number;
  current_value: number;
  initial_value: number;
  number_of_shares: number;
  income: number;
  transaction_type: string;
  plus_click: number;
  minus_click: number;
  news_tag: string;
}

interface SendTurnResult {
  success: boolean;
  message: string;
}

export async function sendTurnData(
  sessionId: string,
  chapterId: string,
  turnNumber: number,
  turnData: TurnData
): Promise<SendTurnResult> {
  console.log(JSON.stringify(turnData, null, 2));
  try {
    const response = await apiClient.post(`/api/invest/chapter/turn`, {
      chapterId: chapterId,
      turn: turnNumber,
      sessionId: sessionId,
      started_at: turnData.started_at,
      ended_at: turnData.ended_at,
      risk_level: turnData.risk_level,
      current_point: turnData.current_point,
      before_value: turnData.before_value,
      current_value: turnData.current_value,
      initial_value: turnData.initial_value,
      number_of_shares: turnData.number_of_shares,
      income: turnData.income,
      transaction_type: turnData.transaction_type,
      plus_click: turnData.plus_click,
      minus_click: turnData.minus_click,
      news_tag: turnData.news_tag,
    });

    console.log("턴 데이터 전송 성공:", response.data);
    return { success: true, message: response.data };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("턴 데이터 전송 실패:", error.message);
      return { success: false, message: error.message };
    }
    console.error("예상치 못한 에러:", error);
    return { success: false, message: "예상치 못한 에러가 발생했습니다." };
  }
}
