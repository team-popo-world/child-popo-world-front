import { Link } from "react-router-dom";
import { StockDescription } from "../../component/game-component/stock-description";
import { BorderModal } from "../../component/game-component/border-modal";
import closeButton from "@/assets/image/common/close.webp";

interface GameDescription {
  image: string;
  label: string;
  descriptions: string[];
}

interface GameStartExplainProps {
  onClose: () => void;
  gameTitle: string;
  gameDescription: string;
  descriptions: GameDescription[];
  gamePlayPath: string;
  textColor: string;
  stockNameColor: string;
  borderColor: string;
  borderStrokeColor: string;
}

export const GameStartExplain = ({
  onClose,
  gameTitle,
  gameDescription,
  descriptions,
  gamePlayPath,
  textColor,
  stockNameColor,
  borderColor,
  borderStrokeColor,
}: GameStartExplainProps) => {
  return (
    <BorderModal
      borderColor={borderColor}
      borderStrokeColor={borderStrokeColor}
      className={`flex flex-col items-start px-6`}
    >
      <img src={closeButton} alt="닫기" className="  absolute top-3 right-3 w-5 h-5 object-contain" onClick={onClose} />
      {/* 게임 설명 제목 */}
      <h1 className={`my-2 text-2xl font-extrabold self-center`} style={{ color: textColor }}>
        게임 설명
      </h1>
      {/* 게임 설명 내용 */}
      {/* tracking-[0.02rem] 글자 간격 조정 */}
      <p className={`px-4 text-xs font-bold mb-3 letter-spacing: tracking-[0.02rem]`} style={{ color: textColor }}>
        {gameDescription}
      </p>
      {/* 모의투자에서 돼지들 설명 영역 */}
      <section className="flex flex-col gap-y-3">
        {descriptions.map((desc, index) => (
          <StockDescription key={index} image={desc.image} label={desc.label} bgColor={stockNameColor}>
            {desc.descriptions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </StockDescription>
        ))}
      </section>
      {/* 게임 시작 버튼 */}
      <Link to={gamePlayPath}>
        <div
          className={`absolute bottom-3 right-13 px-3 py-1.5 text-white text-[0.7rem] rounded-lg active:scale-95 transition-all duration-100`}
          style={{ backgroundColor: stockNameColor }}
        >
          게임 시작
        </div>
      </Link>
    </BorderModal>
  );
};
