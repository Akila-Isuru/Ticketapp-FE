import React, { useState, useEffect } from "react";
import HeroEventCard from "./HeroEventCard";
import type { Event } from "../types";

interface HeroEventStackProps {
  events: Event[];
}

const HeroEventStack: React.FC<HeroEventStackProps> = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (events.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [events.length]);

  if (events.length === 0) return null;

  const activeEvent = events[activeIndex];

  return (
    <div className="relative w-full flex justify-center">
      {/* Faded card peeking out from behind, for the "stack" look */}
      <div className="absolute top-3 -right-3 w-full max-w-sm aspect-square bg-gray-100 rounded-2xl shadow-md rotate-3" />

      <div key={activeEvent.id} className="relative animate-hero-card-in">
        <HeroEventCard event={activeEvent} />
      </div>
    </div>
  );
};

export default HeroEventStack;
