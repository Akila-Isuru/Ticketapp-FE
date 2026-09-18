import React from "react";

interface HeroProgressDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

const HeroProgressDots: React.FC<HeroProgressDotsProps> = ({
  count,
  activeIndex,
  onSelect,
}) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-1.5 rounded-full transition-all cursor-pointer ${
            index === activeIndex
              ? "w-8 bg-orange-500"
              : "w-1.5 bg-white/40 hover:bg-white/60"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroProgressDots;
