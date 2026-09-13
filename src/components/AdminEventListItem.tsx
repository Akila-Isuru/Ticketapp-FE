import React from "react";
import {
  Calendar,
  MapPin,
  DollarSign,
  Ticket,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Event } from "../types";

interface AdminEventListItemProps {
  event: Event;
  isEditing: boolean;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

const AdminEventListItem: React.FC<AdminEventListItemProps> = ({
  event,
  isEditing,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center gap-4 ${
        isEditing
          ? "border-indigo-400 ring-2 ring-indigo-100"
          : "border-gray-200"
      }`}
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-slate-800">{event.title}</h3>
        <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />{" "}
            {new Date(event.eventDate).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {event.location}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-green-500" /> LKR{" "}
            {event.ticketPrice}
          </span>
          <span className="flex items-center gap-1">
            <Ticket className="w-3.5 h-3.5 text-orange-500" />{" "}
            {event.availableTickets} / {event.totalTickets} Left
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(event)}
          className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md transition cursor-pointer"
          title="Edit event"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(event)}
          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition cursor-pointer"
          title="Delete event"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AdminEventListItem;
