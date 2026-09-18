import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import type { Event } from "../types";

interface HeroEventCardProps {
  event: Event;
}

const useCountdown = (eventDate: string) => {
  const calculate = () => {
    const diff = new Date(eventDate).getTime() - new Date().getTime();
    if (diff <= 0) return "Started";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d : ${hours.toString().padStart(2, "0")}h : ${mins
      .toString()
      .padStart(2, "0")}m`;
  };

  const [label, setLabel] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setLabel(calculate()), 60000);
    return () => clearInterval(timer);
  }, [eventDate]);

  return label;
};

const HeroEventCard: React.FC<HeroEventCardProps> = ({ event }) => {
  const countdown = useCountdown(event.eventDate);

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative w-full max-w-sm">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full aspect-square object-cover rounded-2xl shadow-xl"
      />

      <div className="absolute top-4 left-4 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2">
        <span className="bg-orange-500 text-white p-1.5 rounded-lg">
          <Clock className="w-4 h-4" />
        </span>
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide">
            Starts in
          </p>
          <p className="text-sm font-bold text-slate-800">{countdown}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-b-2xl px-4 py-3">
        <p className="text-xs text-gray-400">{formattedDate}</p>
        <p className="font-bold text-slate-800 text-sm">{event.location}</p>
        <div className="flex items-end justify-between mt-1">
          <span className="text-[10px] text-gray-400">FROM</span>
          <span className="text-lg font-bold text-indigo-600">
            LKR {event.ticketPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <span className="absolute -bottom-3 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
        ★ Now Trending
      </span>
    </div>
  );
};

export default HeroEventCard;
