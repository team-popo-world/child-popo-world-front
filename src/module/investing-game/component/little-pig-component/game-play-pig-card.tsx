import box from "@/assets/image/investing-game/little_pig/little_pig_box.webp";
import bulb from "@/assets/image/investing-game/little_pig/little_pig_bulb.webp";
import coin from "@/assets/image/common/common_coin.webp";
import clsx from "clsx";

interface PigCardProps {
  pigImage: string;
  name: string;
  expectation: string;
  currentPrice: number;
  priceChange: number;
  quantity: number;
  riskType: string;
  count: number;
  volumeChange: number;
  onQuantityChange: (newQuantity: number) => void;
  point: number;
  setPoint: (newPoint: number) => void;
  setMinusClickEvent: () => void;
  setPlusClickEvent: () => void;
}

export const GamePlayPigCard = ({
  pigImage,
  name,
  expectation,
  currentPrice,
  priceChange,
  quantity,
  riskType,
  count,
  volumeChange,
  onQuantityChange,
  point,
  setPoint,
  setMinusClickEvent,
  setPlusClickEvent,
}: PigCardProps) => {
  const handleDecrease = () => {
    if (count <= 0) return;
    onQuantityChange(count - 1);
    setPoint(point + currentPrice);
    setMinusClickEvent();
  };

  const handleIncrease = () => {
    if (canBuy()) {
      onQuantityChange(count + 1);
      setPoint(point - currentPrice);
      setPlusClickEvent();
    }
  };

  const canBuy = () => {
    if (currentPrice <= point) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="relative flex flex-col items-start px-4 py-2 w-44 h-59 bg-main-yellow-300 border-2 xl:border-5 border-main-brown-450 rounded-xl">
      <img src={pigImage} alt={name} className="self-center min-w-0 h-14 object-contain mt-4 mb-1" />
      <h4 className="mb-0.5 text-main-brown-575 text-[0.7rem] font-bold self-center"> {name}</h4>
      <p className="mb-1 text-main-brown-575 text-[0.55rem] font-bold ">{expectation}</p>
      <div className="flex items-center gap-x-0.5 mb-0.5 mt-auto">
        <img src={coin} alt="코인" className="w-3 h-3 object-contain" />
        <span className="text-main-brown-575 text-[0.55rem] font-bold ">현재가격: {currentPrice}냥</span>
        <span
          className={clsx("pl-1.5 text-[0.5rem] font-bold", {
            "text-main-red-600": priceChange > 0,
            "text-main-blue-600": priceChange < 0,
            "text-main-brown-575": priceChange === 0,
          })}
        >
          {/* 변동 없을때 빈 문자열 */}
          {priceChange > 0 ? `+${priceChange}냥` : priceChange < 0 ? `-${Math.abs(priceChange)}냥` : ""}
        </span>
      </div>
      <div className="flex items-center gap-x-0.5">
        <img src={box} alt="물건" className="w-3.5 h-3.5 object-contain" />
        <span className="text-main-brown-575 text-[0.55rem] font-bold">보유수량: {quantity}개</span>
      </div>
      {/* 개수 선택, 구매 판매 */}
      <div className="relative w-fit flex flex-col  items-center self-center">
        <div className="font-bold text-main-brown-575 text-[0.55rem]">개수 선택</div>
        {/* 개수 선택 버튼 */}
        <div className="flex w-28 mb-1.5 text-center text-[0.65rem] font-bold border-2 xl:border-4 border-main-brown-350 rounded-md ">
          <div
            className="w-8 py-[0.1rem] bg-main-yellow-150 rounded-l-md cursor-pointer active:scale-95 transition-all duration-100"
            onClick={handleDecrease}
          >
            -
          </div>
          <div className="w-12 py-[0.1rem] bg-white text-main-brown-575  border-x-2 xl:border-x-4 border-main-brown-300">
            {count}
          </div>
          <div
            className="w-8 py-[0.1rem] bg-main-yellow-150 rounded-r-md cursor-pointer active:scale-95 transition-all duration-100"
            onClick={handleIncrease}
          >
            +
          </div>
        </div>
        {/* 보유수량 변화 */}
        {volumeChange > 0 ? (
          <div className="absolute bottom-1.5 right-9  text-main-red-600 text-[0.4rem] font-extrabold">
            + {volumeChange}
          </div>
        ) : (
          volumeChange < 0 && (
            <div className="absolute bottom-1.5 right-9  text-main-blue-600 text-[0.4rem] font-extrabold">
              {volumeChange}
            </div>
          )
        )}
      </div>
      {/* 맨위 오른쪽 위치에 위험 유형 표시 */}
      <div className="absolute top-1.5 right-2 px-1.5 py-0.5 bg-black/20 rounded-md text-[0.45rem] font-bold text-white">
        {riskType}
      </div>
      <div className="absolute top-6 right-3 flex items-center">
        <img src={bulb} alt="전구" className="w-4 h-4 object-contain" />
        <span className="-ml-0.5 text-main-yellow-400 text-[0.4rem] font-bold">힌트</span>
      </div>
    </div>
  );
};
