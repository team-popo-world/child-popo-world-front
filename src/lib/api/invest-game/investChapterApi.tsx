import apiClient, { ApiError } from "../axios";

interface ChapterData {
  sessionId: string;
  story: string;
}

interface ChapterResult {
  success: boolean;
  message: string;
  data?: ChapterData;
}

export async function getChapterData(chapterId: string): Promise<ChapterResult> {
  try {
    console.log("chapterId", chapterId);
    const response = await apiClient.post("/api/invest/chapter", {
      chapterId: chapterId,
    });

    return {
      success: true,
      message: "챕터 데이터 조회 성공",
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("챕터 데이터 조회 실패:", error.message);
      return { success: false, message: error.message };
    }
    console.error("예상치 못한 에러:", error);
    return { success: false, message: "예상치 못한 에러가 발생했습니다." };
  }
}
