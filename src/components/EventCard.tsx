import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import EventCardBadge from "./EventCardBadge";
import EventCardImage from "./EventCardImage";
import type { Event } from "../types";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCardClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-indigo-200 transition cursor-pointer overflow-hidden flex flex-col"
    >
      <EventCardImage
        imageUrl={event.cardImageUrl || event.imageUrl}
        title={event.title}
      />

      <div className="p-4">
        <h2 className="text-lg font-bold text-slate-800 mb-1">{event.title}</h2>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{event.location}</span>
        </div>

        <EventCardBadge category={event.category} />

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1.5 text-orange-500 text-sm font-medium">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <span className="text-slate-700 text-sm">{formattedTime}</span>
          <span className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1 text-indigo-600 font-bold text-sm">
            <DollarSign className="w-4 h-4" />
            <span>{event.ticketPrice}</span>
            <span className="text-xs font-normal text-gray-400">onwards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
