import type { ReactNode } from "react";

interface StockDescriptionProps {
  image: string;
  label: string;
  children: ReactNode;
  bgColor?: string;
}

export const StockDescription = ({ image, label, children, bgColor }: StockDescriptionProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center gap-y-0.5 w-20">
        <img src={image} alt={label} className="min-w-0 h-9 object-contain" />
        <div
          className="ml-1 px-1.5 py-[0.125rem] font-light text-white text-[0.55rem] rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          {label}
        </div>
      </div>
      <div className="flex items-center">
        {/* tracking-[0.01rem] 글자 간격 조정 */}
        <ol className="text-[0.6rem] font-base list-disc space-y-1 pl-4 tracking-[0.01rem]">{children}</ol>
      </div>
    </div>
  );
};
