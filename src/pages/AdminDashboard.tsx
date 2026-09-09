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
  Pencil,
  Trash2,
  X,
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

  const [editingId, setEditingId] = useState<number | null>(null);

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

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setTicketPrice("");
    setTotalTickets("");
    setImageUrl("");
    setEventDate("");
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      location,
      ticketPrice: parseFloat(ticketPrice),
      totalTickets: parseInt(totalTickets, 10),
      imageUrl,
      eventDate,
    };

    try {
      if (editingId) {
        await API.put(`/events/${editingId}`, payload);
        Swal.fire({
          icon: "success",
          title: "Event Updated!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await API.post("/events", payload);
        Swal.fire({
          icon: "success",
          title: "Event Created!",
          text: "New event added successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      resetForm();
      fetchEvents();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: editingId ? "Failed to Update Event" : "Failed to Create Event",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (evt: Event) => {
    setEditingId(evt.id);
    setTitle(evt.title);
    setLocation(evt.location);
    setTicketPrice(evt.ticketPrice.toString());
    setTotalTickets(evt.totalTickets.toString());
    setImageUrl(evt.imageUrl);
    // datetime-local input needs "YYYY-MM-DDTHH:mm" format
    setEventDate(evt.eventDate ? evt.eventDate.slice(0, 16) : "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = async (evt: Event) => {
    const result = await Swal.fire({
      title: "Delete this event?",
      text: `"${evt.title}" will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/events/${evt.id}`);
        Swal.fire("Deleted!", "Event has been removed.", "success");
        if (editingId === evt.id) {
          resetForm();
        }
        fetchEvents();
      } catch (error: any) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to delete event",
          "error",
        );
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              {editingId ? "Edit Event" : "Add New Event"}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Cancel edit"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  className={`bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center gap-4 ${
                    editingId === evt.id
                      ? "border-indigo-400 ring-2 ring-indigo-100"
                      : "border-gray-200"
                  }`}
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

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEditClick(evt)}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md transition cursor-pointer"
                      title="Edit event"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(evt)}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
