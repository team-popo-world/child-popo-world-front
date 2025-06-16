import type { ReactNode } from "react";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface PinkBorderModalProps {
  children: ReactNode;
  className?: string;
  borderColor?: string;
  borderStrokeColor?: string;
}

// #ff9d9d pink

export const BorderModal = ({ children, borderColor, borderStrokeColor, className = "" }: PinkBorderModalProps) => {
  return (
    <div
      className={`relative flex items-center justify-center w-[33.5rem] h-[21.5rem] border-2 sm:border-3 md:border-4 xl:border-5 rounded-4xl`}
      style={{ backgroundColor: borderColor, borderColor: borderStrokeColor }}
    >
      <div
        className={`relative w-[32.25rem] h-[20.25rem] bg-white border-2 md:border-3 xl:border-4 rounded-3xl ${className}`}
        style={{ borderColor: borderStrokeColor }}
      >
        {children}
        <img
          src={IMAGE_URLS.investing_game.little_pig.little_siren_pig}
          alt="siren pig"
          className="absolute -bottom-6 -right-7 min-w-0 h-20 object-contain"
        />
      </div>
    </div>
  );
};
