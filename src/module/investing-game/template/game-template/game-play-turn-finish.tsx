// src/module/investing-game/template/little-pig-template/game-play-turn-finish.tsx
import { BorderModal } from "@/module/investing-game/component/game-component/border-modal";
import { TurnFinishStockCard } from "@/module/investing-game/component/game-component/turn-finish-stock-card";
import coin from "@/assets/image/common/common_coin.webp";

// 돼지 데이터 타입 정의
interface StockData {
  image: string;
  name: string;
  priceChange: number;
  countChange: number;
}

interface GamePlayTurnFinishProps {
  onNextTurn: () => void;
  turn: number;
  stockData: StockData[];
  result: string;
  totalPoint: number;
  titleTextColor: string;
  textColor: string;
  buttonColor: string;
  borderColor: string;
  borderStrokeColor: string;
}

export const GamePlayTurnFinish = ({
  onNextTurn,
  turn,
  stockData,
  result,
  totalPoint,
  titleTextColor,
  textColor,
  buttonColor,
  borderColor,
  borderStrokeColor,
}: GamePlayTurnFinishProps) => {
  return (
    <BorderModal
      className="flex flex-col items-start px-10 "
      borderColor={borderColor}
      borderStrokeColor={borderStrokeColor}
    >
      <h1 className={`self-center mt-2.5 mb-1.5 text-[1.65rem] font-extrabold`} style={{ color: titleTextColor }}>
        {turn + 1 <= 6 ? turn + 1 : turn}
        {turn + 1 <= 6 ? "턴 시작!" : "턴 종료!"}
      </h1>
      <p className={`mb-4 text-[0.75rem] font-bold `}>{result}</p>

      <section className="mb-4 grid grid-cols-3 gap-x-2 w-full">
        {stockData.map((stock, index) => (
          <TurnFinishStockCard key={index} {...stock} textColor={textColor} />
        ))}
      </section>

      <div className="flex items-center gap-x-1 self-center">
        <img src={coin} alt="코인" className="w-8 h-8 object-contain" />
        <p className={`text-lg font-bold`}>총 자산: {totalPoint}냥</p>
      </div>
      <button
        className={`absolute bottom-2 right-13 px-3 py-1.5 text-white text-[0.7rem] font-bold rounded-lg active:scale-95 transition-all duration-100`}
        style={{ backgroundColor: buttonColor }}
        onClick={onNextTurn}
      >
        Let's 투자!
      </button>
    </BorderModal>
  );
};
