import React from "react";
import type { Event } from "../types";

interface HeroBackgroundProps {
  events: Event[];
  activeIndex: number;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  events,
  activeIndex,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {events.map((evt, index) => (
        <img
          key={evt.id}
          src={evt.imageUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
    </div>
  );
};

export default HeroBackground;
