import { useParams, useSearchParams } from "react-router-dom";
import { GameStartTemplate } from "@/module/investing-game/template/game-start-template";
import { GamePlayTemplate } from "@/module/investing-game/template/game-play-template";
import { GameEndTemplate } from "@/module/investing-game/template/game-end-template";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endGame } from "@/lib/api/invest-game/investClearAPi";
import { getKSTDateTime } from "@/lib/utils/getKSTDateTime";
import { sendTurnData } from "@/lib/api/invest-game/investTurnUpdate";
import { getChapterData } from "@/lib/api/invest-game/investChapterApi";

// 게임 관련 타입 정의
export interface Stock {
  name: string;
  risk_level: string;
  description: string;
  before_value: number;
  current_value: number;
  expectation: string;
}

export interface Scenario {
  turn_number: number;
  result: string;
  news: string;
  news_tag: string;
  news_hint: string;
  stocks: Stock[];
}

export interface GameState {
  point: number; // 현재 포인트
  turn: number; // 현재 턴
  turnMax: number; // 최대 턴 // 이것도 따로 저장 안해도 되긴함.
  beforePrice: number[]; // 이전 턴 주식 가격
  price: number[]; // 이건 current 시나리오에 있어서 따로 안만들어도 되긴함.
  nextPrice: number[]; // 다음 턴 주식 가격
  avgBuyPrice: number[]; // 구매 평단가
  count: number[]; // 보유 수량
  beforeCount: number[]; // 이전 턴 보유 수량
  scenario: Scenario[]; // 시나리오 데이터
  currentScenario: Scenario | null; // 현재 시나리오
  result: string; // 턴 종료 후 결과 1턴의 결과 공백, 2턴의 결과는 1턴에 대한 결과값
  isGameOver: boolean; // 게임 종료 여부
  isGameStart: boolean; // 게임 시작 여부
  turnFinish: boolean; // 턴 종료 여부
  plusClickCount: number[]; // 플러스 클릭 수
  minusClickCount: number[]; // 마이너스 클릭 수
  news_tag: string;
}

export interface TurnData {
  started_at: string; // ISO datetime string
  ended_at: string; // ISO datetime string
  risk_level: string; // 예: "고위험 고수익"
  current_point: number;
  before_value: number;
  current_value: number;
  initial_value: number;
  number_of_shares: number;
  income: number;
  transaction_type: string; // 예: "buy" 또는 "sell"
  plus_click: number;
  minus_click: number;
  news_tag: string;
}

const INITIAL_POINT = 2000;
const INITIAL_GAME_STATE: GameState = {
  point: INITIAL_POINT,
  turn: 1,
  turnMax: 0,
  beforePrice: [0, 0, 0],
  price: [0, 0, 0],
  nextPrice: [0, 0, 0],
  avgBuyPrice: [0, 0, 0],
  count: [0, 0, 0],
  beforeCount: [0, 0, 0],
  scenario: [],
  currentScenario: null,
  result: "",
  isGameOver: false,
  isGameStart: false,
  turnFinish: false,
  plusClickCount: [0, 0, 0],
  minusClickCount: [0, 0, 0],
  news_tag: "",
};

const CHAPTER_ID = {
  "little-pig": "1111",
  truck: "2222",
  ninja: "3333",
  masic: "4444",
};

export default function InvestingGame() {
  // 동적 파라미터useParams 가 없으면 빈 문자열로 초기화
  const { gametype = "" } = useParams() || {};
  // 쿼리 파라미터 가져오기
  const [searchParams] = useSearchParams();
  const gameStage = searchParams.get("stage") || "";
  // 게임 상태 초기화
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [sessionId, setSessionId] = useState("");
  const [startedAt, setStartAt] = useState("");
  const navigate = useNavigate();

  // 게임 상태 업데이트 헬퍼 함수
  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  // 시나리오 데이터 로드
  useEffect(() => {
    if (gameStage === "game-play") {
      const fetchChapterData = async () => {
        const result = await getChapterData(CHAPTER_ID[gametype as keyof typeof CHAPTER_ID]);

        if (result.success && result.data) {
          const data = result.data;
          const sessionId = data.sessionId; // 게임 세션 id 추출
          setSessionId(sessionId); // 게임 세션 id 저장
          const story = JSON.parse(data.story); // 게임 시나리오 추출
          console.log(story);

          setGameState((prev) => ({
            ...prev,
            scenario: story, // 게임 시나리오 저장
            currentScenario: story[0], // 첫번째 시나리오 저장
            result: story[1].result, // 뉴스에 대한 결과 초기화 (이번턴 뉴스에 대한 결과는 다음턴 시나리오에 있음)
            price: story[0].stocks.map((stock: Stock) => stock.current_value), // 첫번째 시나리오의 주식 가격 저장
            nextPrice: story[1].stocks.map((stock: Stock) => stock.current_value), // 다음 턴 주식 가격 저장
            turnMax: story.length, // 게임 시나리오 길이 저장
            news_tag: story[0].newtag, // 뭔지 모르겠음
          }));

          const nowKST = getKSTDateTime();
          setStartAt(nowKST);
        } else {
          console.error("챕터 데이터 조회 실패:", result.message);
        }
      };

      fetchChapterData();
    }
  }, [gameStage]);

  // 거래 타입 결정 헬퍼 함수
  const determineTransactionType = (beforeCount: number, currentCount: number): string => {
    if (currentCount > beforeCount) {
      return "BUY";
    } else if (currentCount < beforeCount) {
      return "SELL";
    } else {
      return "KEEP";
    }
  };

  const handleTurnFinish = () => {
    console.log("턴 종료");
    // TurnData 생성
    const nowKST = getKSTDateTime();
    setStartAt(nowKST); // 현재시간 업데이트 다음턴 시작시간
    // 각 주식별로 TurnData 생성하고 전송
    gameState.currentScenario?.stocks.forEach((stock, index) => {
      const income =
        // 이전 개수가 현재 개수보다 많으면 판매 이익 계산
        gameState.beforeCount[index] - gameState.count[index] > 0
          ? // (이전 개수 - 현재 개수) * (현재 가격 - 구매 평단가)
            (gameState.beforeCount[index] - gameState.count[index]) *
            (gameState.price[index] - gameState.avgBuyPrice[index])
          : 0;

      const turnData: TurnData = {
        started_at: startedAt, // 턴 시작시간
        ended_at: nowKST, // 턴 종료시간
        risk_level: stock.risk_level, // 주식 위험도
        current_point: gameState.point, // 현재 포인트
        before_value: gameState.beforePrice[index], // 이전 주식 가격
        current_value: gameState.price[index], // 현재 주식 가격
        initial_value: 100, // 또는 stock.initial_value가 있다면 사용
        number_of_shares: gameState.count[index], // 해당 주식의 보유 수량
        income: income, // 시세 차익
        transaction_type: determineTransactionType(gameState.beforeCount[index], gameState.count[index]),
        plus_click: gameState.plusClickCount[index], // 플러스 클릭 수
        minus_click: gameState.minusClickCount[index], // 마이너스 클릭 수
        news_tag: gameState.news_tag,
      };

      // 각 주식별로 턴 데이터 전송
      sendTurnData(sessionId, "1111", gameState.turn, turnData);
    });

    // 턴 끝남
    // 만약 게임이 끝났다면 게임 종료 처리
    if (gameState.turn >= gameState.turnMax - 1) {
      const lastPoint =
        gameState.point + gameState.price.reduce((acc, curr, index) => acc + curr * gameState.count[index], 0);
      updateGameState({ isGameOver: true });
      // 게임 결과 페이지로 이동
      navigate(`/investing/game/${gametype}?stage=game-end`);
      endGame(sessionId, "1111", true, lastPoint - INITIAL_POINT);
      return;
    }

    // 다음 턴으로 이동
    const nextTurn = gameState.turn + 1;
    const nextScenario = gameState.scenario[nextTurn - 1];
    const nextPrices = nextScenario.stocks.map((stock) => stock.current_value);

    // 다 다음턴 주식 가격 계산
    let nextNextPrices: number[] = [0, 0, 0];
    if (gameState.turn + 2 <= gameState.turnMax) {
      const nextNextTurn = gameState.turn + 2;
      const nextNextScenario = gameState.scenario[nextNextTurn - 1];
      nextNextPrices = nextNextScenario.stocks.map((stock) => stock.current_value);
    } else {
      nextNextPrices = nextPrices;
    }

    updateGameState({
      turn: nextTurn,
      currentScenario: nextScenario,
      beforeCount: [...gameState.count],
      beforePrice: [...gameState.price],
      price: nextPrices,
      nextPrice: nextNextPrices,
      avgBuyPrice: gameState.avgBuyPrice.map((prevAvg, index) => {
        const prevCount = gameState.beforeCount[index]; // 이전 턴 보유 수량
        const currCount = gameState.count[index]; // 현재 턴 보유 수량
        const diffCount = currCount - prevCount; // 보유 수량 차이

        if (diffCount > 0) {
          const newAmount = diffCount * gameState.price[index]; // 새로 구매 주식 총 금액: 새로 구매 주식 개수 * 현재 주식 가치
          const oldAmount = prevCount * prevAvg; // 이전턴 총 금액: 이전턴 보유 주식 개수 * 이전턴 평단가
          const totalCount = prevCount + diffCount; // 총 개수: 이전턴 보유 주식 개수 + 새로 구매 주식 개수

          const avg = (oldAmount + newAmount) / (totalCount || 1); // 평단가 계산: 이전턴 총 금액 + 새로 구매 주식 총 금액 / 총 개수
          return Math.floor(avg); // 소수점 버림
        } else {
          // 매수가 없으면 기존 평단가 유지
          return prevAvg;
        }
      }),
      plusClickCount: [0, 0, 0], // 플러스 클릭 수 초기화
      minusClickCount: [0, 0, 0], // 마이너스 클릭 수 초기화
      news_tag: nextScenario.news_tag,
    });
  };

  const handleGameOut = () => {
    navigate("/investing");
    endGame(sessionId, "1111", false, 0);
  };

  // 예시
  // http://localhost:5173/investing/game/little-pig?stage=game-start
  // http://localhost:5173/investing/game/little-pig?stage=game-start

  // 게임 타입에 따라 템플릿 렌더링
  switch (gameStage) {
    case "game-start":
      return <GameStartTemplate gameType={gametype} />;
    case "game-play":
      return (
        <GamePlayTemplate
          gameType={gametype}
          gameState={gameState}
          updateGameState={updateGameState}
          handleTurnFinish={handleTurnFinish}
          handleGameOut={handleGameOut}
        />
      );
    case "game-end":
      const lastPoint =
        gameState.point + gameState.price.reduce((acc, curr, index) => acc + curr * gameState.count[index], 0);
      const initialPoint = INITIAL_POINT;
      const stockNames = gameState.currentScenario?.stocks.map((stock) => stock.name);
      return (
        <GameEndTemplate
          gameType={gametype}
          lastPoint={lastPoint}
          initialPoint={initialPoint}
          sessionId={sessionId}
          stockNames={stockNames || []}
          scenario={gameState.scenario}
        />
      );
    default:
      return null;
  }
}
