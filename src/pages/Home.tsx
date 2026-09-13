import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { openMockPaymentModal } from "../utils/paymentModal";
import type { Event } from "../types";

function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchWord, setSearchWord] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await API.get("/events");
      if (response.data && response.data.data) {
        setEvents(response.data.data);
      } else if (Array.isArray(response.data)) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchWord.trim()) {
      fetchEvents();
      return;
    }

    setLoading(true);
    try {
      const response = await API.get(`/events/search?word=${searchWord}`);
      setEvents(response.data.data || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchWord("");
    fetchEvents();
  };

  const handleBookTicket = async (event: Event) => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please Login",
        text: "You need to be logged in to book tickets!",
      });
      navigate("/login");
      return;
    }

    let userId = 1;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.userId || payload.id || 1;
    } catch (e) {
      console.error(e);
    }

    const { value: ticketCount } = await Swal.fire({
      title: `Book Tickets for ${event.title}`,
      text: `Price per ticket: LKR ${event.ticketPrice} | Available: ${event.availableTickets}`,
      input: "number",
      inputLabel: "Number of Tickets",
      inputValue: 1,
      inputAttributes: {
        min: "1",
        max: event.availableTickets.toString(),
        step: "1",
      },
      showCancelButton: true,
      confirmButtonText: "Proceed to Checkout",
    });

    if (ticketCount) {
      try {
        const response = await API.post("/bookings", {
          userId: userId,
          eventId: event.id,
          ticketCount: parseInt(ticketCount, 10),
        });

        const bookingData = response.data.data;

        await openMockPaymentModal(
          bookingData.bookingId,
          bookingData.eventTitle,
          bookingData.totalAmount,
        );

        fetchEvents();
        navigate("/my-bookings");
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: error.response?.data?.message || "Failed to complete booking.",
        });
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8">
      <Hero />

      <div id="events-section">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Upcoming Events
        </h1>

        <SearchBar
          searchWord={searchWord}
          onSearchWordChange={setSearchWord}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />

        {loading ? (
          <div className="text-center mt-12 text-slate-600 font-semibold">
            Loading Events...
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">
            No events found at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} onBook={handleBookTicket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
