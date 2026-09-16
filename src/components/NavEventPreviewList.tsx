import React from "react";
import { Link } from "react-router-dom";
import type { Event } from "../types";

interface NavEventPreviewListProps {
  events: Event[];
  onLinkClick: () => void;
}

const NavEventPreviewList: React.FC<NavEventPreviewListProps> = ({
  events,
  onLinkClick,
}) => {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-400 px-2 py-4">
        No events in this category yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {events.map((evt) => {
        const formattedDate = new Date(evt.eventDate).toLocaleDateString(
          "en-US",
          { weekday: "short", day: "2-digit", month: "short" },
        );

        return (
          <Link
            key={evt.id}
            to={`/events/${evt.id}`}
            onClick={onLinkClick}
            className="flex items-center gap-3 py-2.5 hover:bg-indigo-50 rounded-lg px-2 transition"
          >
            <img
              src={evt.imageUrl}
              alt={evt.title}
              className="w-10 h-10 rounded-md object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {evt.title}
              </p>
              <p className="text-xs text-gray-500">
                {formattedDate} · LKR {evt.ticketPrice}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavEventPreviewList;
