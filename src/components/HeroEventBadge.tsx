import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import type { Event } from "../types";

interface HeroEventBadgeProps {
  event: Event;
}

const useCountdownLabel = (eventDate: string) => {
  const calculate = () => {
    const diff = new Date(eventDate).getTime() - Date.now();
    if (diff <= 0) return "Happening now";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

    if (days > 0) return `${days}d ${hours}h to go`;
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${mins}m to go`;
  };

  const [label, setLabel] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setLabel(calculate()), 60000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return label;
};

const HeroEventBadge: React.FC<HeroEventBadgeProps> = ({ event }) => {
  const countdown = useCountdownLabel(event.eventDate);

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      key={event.id}
      className="animate-hero-fade-up bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 max-w-sm"
    >
      <div className="flex items-center gap-1.5 text-orange-400 text-xs font-semibold mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{countdown}</span>
      </div>

      <h3 className="text-white font-bold text-lg leading-snug mb-1 line-clamp-2">
        {event.title}
      </h3>

      <p className="text-white/70 text-sm mb-3">
        {formattedDate} · {event.location}
      </p>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-white/50 uppercase tracking-wide">
            From
          </p>
          <p className="text-xl font-bold text-white">
            LKR {event.ticketPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroEventBadge;
