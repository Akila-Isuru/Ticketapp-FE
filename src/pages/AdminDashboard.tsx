import React, { useState, useEffect } from "react";
import API from "../api";
import Swal from "sweetalert2";
import { Calendar } from "lucide-react";
import EventForm from "../components/EventForm";
import AdminEventListItem from "../components/AdminEventListItem";
import type { Event } from "../types";

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
        <EventForm
          title={title}
          location={location}
          eventDate={eventDate}
          ticketPrice={ticketPrice}
          totalTickets={totalTickets}
          imageUrl={imageUrl}
          editingId={editingId}
          loading={loading}
          onTitleChange={setTitle}
          onLocationChange={setLocation}
          onEventDateChange={setEventDate}
          onTicketPriceChange={setTicketPrice}
          onTotalTicketsChange={setTotalTickets}
          onImageUrlChange={setImageUrl}
          onSubmit={handleSubmit}
          onCancelEdit={resetForm}
        />

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
                <AdminEventListItem
                  key={evt.id}
                  event={evt}
                  isEditing={editingId === evt.id}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
