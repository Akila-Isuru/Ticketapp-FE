import React from "react";
import HeroEventCard from "./HeroEventCard";
import type { Event } from "../types";

interface HeroEventStackProps {
  order: number[];
  events: Event[];
  swapping: boolean;
}

const HeroEventStack: React.FC<HeroEventStackProps> = ({
  order,
  events,
  swapping,
}) => {
  if (events.length === 0) return null;

  const frontEvent = events[order[0]];

  const frontStyle: React.CSSProperties = {
    transform: swapping
      ? "translate(10px, 10px) rotate(3deg) scale(0.96)"
      : "translate(0, 0) rotate(0deg) scale(1)",
    opacity: swapping ? 0.9 : 1,
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Background card peeking behind */}
      <div
        className="absolute inset-0 bg-white border border-slate-100 rounded-2xl shadow-md transition-transform duration-300 ease-in-out"
        style={{
          transform: swapping
            ? "translate(0, 0) rotate(0deg) scale(1)"
            : "translate(10px, 10px) rotate(3deg) scale(0.96)",
        }}
      />

      {/* Front card */}
      <div
        className="relative transition-all duration-300 ease-in-out"
        style={frontStyle}
      >
        <HeroEventCard event={frontEvent} />
      </div>
    </div>
  );
};

export default HeroEventStack;
