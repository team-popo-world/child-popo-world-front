// src/page/main/index.tsx
import backgroundImage from "../../../assets/image/main/main_background.webp";
import emotionsDiaryImage from "../../../assets/image/main/main_emotions_diary.webp";
import investingImage from "../../../assets/image/main/main_investing.webp";
import marketImage from "../../../assets/image/main/main_market.webp";
import questImage from "../../../assets/image/main/main_quest.webp";
import raisingImage from "../../../assets/image/main/main_raising.webp";
import savingsImage from "../../../assets/image/main/main_savings.webp";
import quizImage from "../../../assets/image/main/main_quiz.webp";
import attandanceImage from "../../../assets/image/main/main_attendance.webp";
import coinImage from "../../../assets/image/common/common_coin.webp";
import nameImage from "../../../assets/image/common/common_name.webp";
import { TextWithStroke } from "../../../components/text/TextWithStroke";
import { Link } from "react-router-dom";
import { Background } from "../../../components/layout/Background";
import { Poni } from "../components/Poni";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ISLAND_POSITIONS = {
  market: { top: "4.25rem", left: "3.25rem" },
  emotionDiary: { top: "11rem", left: "3rem" },
  raising: { top: "13.75rem", left: "8.75rem" },
  savings: { top: "14.75rem", left: "19rem" },
  quest: { top: "12rem", left: "26rem" },
  investing: { top: "5rem", left: "26rem" },
} as const;
interface MainTemplateProps {
  isAnimating: boolean;
  targetPosition: { top: string; left: string };
  direction: "left" | "right";
  handleIslandClick: (island: keyof typeof ISLAND_POSITIONS, path: string, direction?: "left" | "right") => void;
  handleAnimationComplete: () => void;
}
export default function MainTemplate({
  isAnimating,
  targetPosition,
  direction,
  handleIslandClick,
  handleAnimationComplete,
}: MainTemplateProps) {
  return (
    <Background backgroundImage={backgroundImage}>
      {/* 여백 */}
      <div className="h-7"></div>
      {/* 제목 */}
      <div className="flex justify-center">
        <TextWithStroke
          text="포포월드"
          textClassName="text-main-yellow-800 text-[3.5rem] tracking-[0.05rem]"
          strokeClassName="text-main-brown-800 text-[3.5rem] text-stroke-width-[0.4rem] text-stroke-color-main-brown-800 tracking-[0.05rem]"
        />
      </div>
      {/* 퀴즈, 출석, 포인트 */}
      <Link to="/quiz">
        <div className="absolute top-2 right-38 w-7 h-7 flex flex-wrap justify-center active:scale-95 transition-all duration-100">
          <img src={quizImage} alt="quiz" className="w-full h-full object-contain" />
          <TextWithStroke
            text="퀴즈"
            textClassName="text-main-yellow-800 text-[0.9rem]"
            strokeClassName="text-main-brown-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
      </Link>
      <Link to="/attandance">
        <div className="absolute top-2 right-29.5 w-7 h-7 flex flex-wrap justify-center active:scale-95 transition-all duration-100">
          <img src={attandanceImage} alt="attandance" className="w-full h-full object-contain" />
          <TextWithStroke
            text="출석"
            textClassName="text-main-blue-700 text-[0.9rem]"
            strokeClassName="text-main-blue-800 text-[0.9rem] text-stroke-width-[0.15rem] text-stroke-color-main-brown-800"
          />
        </div>
      </Link>
      <div className="absolute top-1.5 right-3 w-23 min-h-0 flex flex-wrap active:scale-95 transition-all duration-100">
        <img src={nameImage} alt="attandance" className="w-full h-full object-contain" />
        <div className="absolute top-1.5 left-8">
          <TextWithStroke
            text="포크레인"
            textClassName="text-main-yellow-800 text-[0.8rem] tracking-[0.05rem]"
            strokeClassName="text-main-brown-800 text-[0.8rem] text-stroke-width-[0.12rem] text-stroke-color-main-brown-800 tracking-[0.05rem]"
          />
        </div>
        <div className="relative w-5.5 h-5.5 left-4 inline-flex items-center gap-0.5">
          <img src={coinImage} alt="attandance" className="w-full h-full object-contain" />
          <TextWithStroke
            text="2000냥"
            className="whitespace-nowrap"
            textClassName="text-main-yellow-800 text-[0.7rem] tracking-[0.07rem]"
            strokeClassName="text-main-brown-800 text-[0.7rem] text-stroke-width-[0.12rem] text-stroke-color-main-brown-800 tracking-[0.07rem]"
          />
        </div>
      </div>
      {/* 섬 */}
      <div onClick={() => handleIslandClick("market", "/market")} className="cursor-pointer">
        <div className="absolute top-17 left-13 w-28 h-28 active:scale-95 transition-all duration-100">
          <img src={marketImage} alt="market" className="w-full h-full object-contain" />
          <div className="absolute top-23 left-7  px-4 text-[0.6rem] py-[2px] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            시장
          </div>
        </div>
      </div>
      <div onClick={() => handleIslandClick("emotionDiary", "/emotionDiary")} className="cursor-pointer">
        <div className="absolute top-60 left-10 w-28 h-28 active:scale-95 transition-all duration-100">
          <img src={emotionsDiaryImage} alt="emotionsDiary" className="w-full h-full object-contain" />
          <div className="absolute top-23 left-5  px-3.5 text-[0.6rem] py-[2px] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            감정일기
          </div>
        </div>
      </div>
      <div onClick={() => handleIslandClick("raising", "/raising")} className="cursor-pointer">
        <div className="absolute top-72 left-38 w-28 h-28 active:scale-95 transition-all duration-100">
          <img src={raisingImage} alt="raising" className="w-full h-full object-contain" />
          <div className="absolute top-24.5 left-5  px-3 text-[0.6rem] py-[2px] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            포포 키우기
          </div>
        </div>
      </div>
      <div onClick={() => handleIslandClick("savings", "/savings", "right")} className="cursor-pointer">
        <div className="absolute top-75 left-85 w-28 h-28 active:scale-95 transition-all duration-100">
          <img src={savingsImage} alt="savings" className="w-full h-full object-contain" />
          <div className="absolute top-22 left-8  px-4 text-[0.6rem] py-[2px] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            적금
          </div>
        </div>
      </div>
      <div onClick={() => handleIslandClick("quest", "/quest", "right")} className="cursor-pointer">
        <div className="absolute top-54 left-117.5 w-28 h-28 active:scale-95 transition-all duration-100">
          <img src={questImage} alt="quest" className="w-full h-full object-contain" />
          <div className="absolute top-23.5 left-7  px-3.5 text-[0.6rem] py-[2px] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            퀘스트
          </div>
        </div>
      </div>
      <div onClick={() => handleIslandClick("investing", "/investing", "right")} className="cursor-pointer">
        <div className="absolute top-24 left-116 w-27 h-27 active:scale-95 transition-all duration-100">
          <img src={investingImage} alt="quiz" className="w-full h-full object-contain" />
          <div className="absolute top-22 left-5.5  px-3.5 text-[0.6rem] py-[2px] font-bold text-main-brown-800 bg-main-yellow-700 border md:border-2 border-main-brown-700 rounded-lg">
            모의투자
          </div>
        </div>
      </div>
      {/* 포니 */}
      <Poni
        isAnimating={isAnimating}
        targetPosition={targetPosition}
        direction={direction}
        onAnimationComplete={handleAnimationComplete}
      />
    </Background>
  );
}
