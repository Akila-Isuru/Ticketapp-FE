import React from "react";
import { Ticket, Calendar, Crown } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import type { Event, TicketTier } from "../types";

interface EventBookingCardProps {
  event: Event;
  tiers: TicketTier[];
  onGetTickets: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  CONCERT: "Concert",
  THEATRE: "Theatre",
  SPORTS: "Sports",
};

const EventBookingCard: React.FC<EventBookingCardProps> = ({
  event,
  tiers,
  onGetTickets,
}) => {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const categoryLabel = CATEGORY_LABELS[event.category] || event.category;

  // If the event has ticket tiers, show the cheapest tier's price.
  // Otherwise fall back to the event's own single ticket price.
  const startingPrice =
    tiers.length > 0
      ? Math.min(...tiers.map((t) => t.price))
      : event.ticketPrice;

  const soldOut =
    tiers.length > 0
      ? tiers.every((t) => t.availableCount <= 0)
      : event.availableTickets <= 0;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 h-fit sticky top-24">
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <Crown className="w-4 h-4 text-green-600" />
      </div>

      <CountdownTimer eventDate={event.eventDate} />

      <div className="flex items-center gap-3 mt-5 mb-5 text-sm">
        <div className="flex items-center gap-1.5 text-orange-500 font-medium">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <span className="text-slate-800 font-medium">{formattedTime}</span>
        <span className="w-px h-4 bg-gray-200" />
        <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-2.5 py-1 rounded-full">
          {categoryLabel}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        <Ticket className="w-4 h-4 text-green-500" />
        <span>
          {event.availableTickets} / {event.totalTickets} tickets available
        </span>
      </div>

      <div className="mb-5">
        <p className="text-sm text-gray-500">Price</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-indigo-600">
            LKR {startingPrice.toLocaleString()}
          </span>
          <span className="text-sm font-normal text-gray-500">onwards</span>
        </div>
      </div>

      <button
        onClick={onGetTickets}
        disabled={soldOut}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
      >
        {soldOut ? "Sold Out" : "Get Tickets"}
      </button>
    </div>
  );
};

export default EventBookingCard;
