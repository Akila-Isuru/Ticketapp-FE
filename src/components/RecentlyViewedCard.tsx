import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import type { Event } from "../types";

interface RecentlyViewedCardProps {
  event: Event;
}

const RecentlyViewedCard: React.FC<RecentlyViewedCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="flex-shrink-0 w-64 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-indigo-200 transition cursor-pointer overflow-hidden"
    >
      <div className="relative w-full h-32 bg-gray-100">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center">
          <Heart className="w-3.5 h-3.5 text-white" />
        </span>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-slate-800 text-sm mb-0.5 truncate">
          {event.title}
        </h3>
        <p className="text-xs text-gray-400 mb-2 truncate">{event.location}</p>

        <div className="flex items-center justify-between text-xs">
          <span className="text-orange-500 font-medium">
            {formattedDate} | {formattedTime}
          </span>
          <span className="text-indigo-600 font-bold">
            LKR {event.ticketPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentlyViewedCard;
