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

  const fetchEvents = async () => {
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

  // Mock Payment Gateway Modal Function
  const openMockPaymentModal = async (
    bookingId: number,
    eventTitle: string,
    totalAmount: number,
  ) => {
    const { value: formValues } = await Swal.fire({
      title: "💳 Mock Payment Gateway",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p style="margin-bottom: 8px; color: #4b5563;"><strong>Event:</strong> ${eventTitle}</p>
          <p style="margin-bottom: 16px; color: #16a34a; font-weight: bold; font-size: 16px;"><strong>Total:</strong> LKR ${totalAmount}</p>

          <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">Cardholder Name</label>
          <input id="swal-card-name" class="swal2-input" placeholder="John Doe" value="John Doe" style="width:100%; margin: 0 0 12px 0;">

          <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">Card Number</label>
          <input id="swal-card-number" class="swal2-input" placeholder="4111 2222 3333 4444" value="4111 2222 3333 4444" style="width:100%; margin: 0 0 12px 0;">

          <div style="display: flex; gap: 10px;">
            <div style="flex: 1;">
              <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">Expiry Date</label>
              <input id="swal-card-exp" class="swal2-input" placeholder="12/28" value="12/28" style="width:100%; margin:0;">
            </div>
            <div style="flex: 1;">
              <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">CVV</label>
              <input id="swal-card-cvv" class="swal2-input" type="password" placeholder="123" value="123" style="width:100%; margin:0;">
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: `Pay LKR ${totalAmount}`,
      confirmButtonColor: "#16a34a",
      cancelButtonText: "Pay Later",
      preConfirm: () => {
        const name = (
          document.getElementById("swal-card-name") as HTMLInputElement
        ).value;
        const number = (
          document.getElementById("swal-card-number") as HTMLInputElement
        ).value;
        if (!name || !number) {
          Swal.showValidationMessage("Please fill in card details");
          return false;
        }
        return { name, number };
      },
    });

    if (formValues) {
      try {
        await API.put(`/bookings/pay/${bookingId}`);
        await Swal.fire(
          "Payment Successful!",
          "Your booking status is updated to PAID.",
          "success",
        );
      } catch (error: any) {
        Swal.fire(
          "Payment Failed",
          error.response?.data?.message || "Failed to process payment.",
          "error",
        );
      }
    }
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

        // Open Mock Card Payment Modal
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
