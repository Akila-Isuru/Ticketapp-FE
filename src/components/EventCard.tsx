import React from "react";
import { MapPin, Ticket, DollarSign } from "lucide-react";

interface Event {
  id: number;
  title: string;
  location: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  imageUrl: string;
}

interface EventCardProps {
  event: Event;
  onBook: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-lg transition">
      <div className="w-full h-40 bg-gray-100 overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            {event.title}
          </h2>

          <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
            <Ticket className="w-4 h-4 text-green-500" />
            <span>
              Available: {event.availableTickets} / {event.totalTickets}
            </span>
          </div>

          <div className="flex items-center gap-1 text-lg font-bold text-indigo-600 my-4">
            <DollarSign className="w-5 h-5" />
            <span>{event.ticketPrice}</span>
            <span className="text-xs font-normal text-gray-500">/ ticket</span>
          </div>
        </div>

        <button
          onClick={() => onBook(event)}
          disabled={event.availableTickets <= 0}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          {event.availableTickets > 0 ? "Book Now" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
