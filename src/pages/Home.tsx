import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { MapPin, Ticket, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  location: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
}

function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Backend එකෙන් Events Fetch කිරීම
  const fetchEvents = async () => {
    try {
      const response = await API.get("/events");
      setEvents(response.data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 2. Ticket Book කිරීමේ Function එක
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

    // Ticket count එක ඇතුළත් කිරීමට SweetAlert Pop-up එකක්
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
      confirmButtonText: "Proceed to Book",
    });

    if (ticketCount) {
      try {
        await API.post("/bookings", {
          eventId: event.id,
          ticketCount: parseInt(ticketCount, 10),
        });

        Swal.fire({
          icon: "success",
          title: "Booking Initiated!",
          text: "Your booking request has been submitted.",
        });

        fetchEvents(); // Update වූ පසු Event list එක නැවත Reload කිරීම
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: error.response?.data?.message || "Failed to complete booking.",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-12 text-slate-600 font-semibold">
        Loading Events...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">
          No events found at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 flex flex-col justify-between p-6 hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                  {evt.title}
                </h2>

                <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{evt.location}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2 text-sm">
                  <Ticket className="w-4 h-4 text-green-500" />
                  <span>
                    Available: {evt.availableTickets} / {evt.totalTickets}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-lg font-bold text-blue-600 my-4">
                  <DollarSign className="w-5 h-5" />
                  <span>{evt.ticketPrice}</span>
                  <span className="text-xs font-normal text-gray-500">
                    / ticket
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBookTicket(evt)}
                disabled={evt.availableTickets <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                {evt.availableTickets > 0 ? "Book Tickets" : "Sold Out"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
