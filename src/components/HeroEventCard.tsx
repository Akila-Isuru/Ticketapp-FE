import React, { useState, useEffect } from "react";
import { Clock, Star } from "lucide-react";
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

  const formattedDate = new Date(event.eventDate)
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const priceNumber = Number(event.ticketPrice) || 0;

  return (
    <div className="relative w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* ---- Image area ---- */}
        <div className="relative aspect-square">
          <img
            src={event.cardImageUrl || event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />

          {/* Countdown pill */}
          <div className="absolute top-4 left-4 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-2.5">
            <span className="bg-orange-500 text-white p-1.5 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                Starts in
              </p>
              <p className="text-sm font-bold text-slate-800 leading-tight">
                {countdown}
              </p>
            </div>
          </div>
        </div>

        {/* ---- Info area ---- */}
        <div className="px-5 py-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400 tracking-wide font-medium">
              {formattedDate}
            </p>
            <p className="font-semibold text-slate-900 text-[15px] truncate mt-0.5">
              {event.location}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Doors {formattedTime}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-slate-400 tracking-widest font-medium">
              FROM
            </p>
            <p className="text-lg font-bold text-slate-900 font-serif leading-tight">
              LKR{" "}
              {priceNumber.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Trending ribbon (outside card, rotated) */}
      <span className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5 rotate-[8deg] whitespace-nowrap">
        <Star className="w-3.5 h-3.5 fill-current" />
        Now Trending
      </span>
    </div>
  );
};

export default HeroEventCard;
