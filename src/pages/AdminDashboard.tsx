import React, { useState, useEffect } from "react";
import API from "../api";
import Swal from "sweetalert2";
import {
  PlusCircle,
  Calendar,
  MapPin,
  DollarSign,
  Ticket,
  Image,
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  location: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  imageUrl: string;
  eventDate: string;
}

const AdminDashboard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      if (response.data && response.data.data) {
        setEvents(response.data.data);
      } else if (Array.isArray(response.data)) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/events", {
        title,
        location,
        ticketPrice: parseFloat(ticketPrice),
        totalTickets: parseInt(totalTickets, 10),
        imageUrl,
        eventDate,
      });

      Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "New event added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setTitle("");
      setLocation("");
      setTicketPrice("");
      setTotalTickets("");
      setImageUrl("");
      setEventDate("");

      fetchEvents();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Event",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-600" /> Add New Event
          </h2>

          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Event Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setLocation(e.target.value)}
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
                onChange={(e) => setEventDate(e.target.value)}
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
                onChange={(e) => setTicketPrice(e.target.value)}
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
                onChange={(e) => setTotalTickets(e.target.value)}
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
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/event-image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition cursor-pointer disabled:bg-indigo-300 text-sm mt-2"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" /> Existing Events (
            {events.length})
          </h2>

          {events.length === 0 ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-gray-500 text-center">
              No events created yet.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center gap-4"
                >
                  {evt.imageUrl && (
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-800">
                      {evt.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600 mt-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />{" "}
                        {new Date(evt.eventDate).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" />{" "}
                        {evt.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-green-500" />{" "}
                        LKR {evt.ticketPrice}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ticket className="w-3.5 h-3.5 text-orange-500" />{" "}
                        {evt.availableTickets} / {evt.totalTickets} Left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
