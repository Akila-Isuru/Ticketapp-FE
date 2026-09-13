import React from "react";
import { PlusCircle, Calendar, Image, X } from "lucide-react";

interface EventFormProps {
  title: string;
  location: string;
  eventDate: string;
  ticketPrice: string;
  totalTickets: string;
  imageUrl: string;
  editingId: number | null;
  loading: boolean;
  onTitleChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onEventDateChange: (v: string) => void;
  onTicketPriceChange: (v: string) => void;
  onTotalTicketsChange: (v: string) => void;
  onImageUrlChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  title,
  location,
  eventDate,
  ticketPrice,
  totalTickets,
  imageUrl,
  editingId,
  loading,
  onTitleChange,
  onLocationChange,
  onEventDateChange,
  onTicketPriceChange,
  onTotalTicketsChange,
  onImageUrlChange,
  onSubmit,
  onCancelEdit,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          {editingId ? "Edit Event" : "Add New Event"}
        </h2>
        {editingId && (
          <button
            onClick={onCancelEdit}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Cancel edit"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Event Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Musical Concert 2026"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g., Nelum Pokuna, Colombo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> Event Date & Time
          </label>
          <input
            type="datetime-local"
            required
            value={eventDate}
            onChange={(e) => onEventDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Ticket Price (LKR)
          </label>
          <input
            type="number"
            min="1"
            step="any"
            required
            value={ticketPrice}
            onChange={(e) => onTicketPriceChange(e.target.value)}
            placeholder="e.g., 2500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Total Tickets
          </label>
          <input
            type="number"
            min="1"
            required
            value={totalTickets}
            onChange={(e) => onTotalTicketsChange(e.target.value)}
            placeholder="e.g., 500"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
            <Image className="w-3.5 h-3.5" /> Event Image URL
          </label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            placeholder="https://example.com/event-image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-medium py-2 rounded-md transition cursor-pointer text-sm mt-2 ${
            editingId
              ? "bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300"
              : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300"
          }`}
        >
          {loading
            ? editingId
              ? "Updating..."
              : "Creating..."
            : editingId
              ? "Update Event"
              : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
