import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { MapPin, Ticket, DollarSign, Calendar, ArrowLeft } from "lucide-react";

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

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const response = await API.get(`/events/${id}`);
      setEvent(response.data.data);
    } catch (error) {
      console.error("Failed to fetch event:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

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

  const handleBookTicket = async () => {
    if (!event) return;

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

        fetchEvent();
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
        Loading Event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center mt-12 text-slate-600 font-semibold">
        Event not found.
      </div>
    );
  }

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="max-w-4xl mx-auto my-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 mb-6 text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </button>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="w-full h-72 bg-gray-100">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            {event.title}
          </h1>

          <div className="flex flex-col gap-3 mb-6">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>
                {formattedDate} | {formattedTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Ticket className="w-5 h-5 text-green-500" />
              <span>
                {event.availableTickets} / {event.totalTickets} tickets
                available
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex items-center gap-1 text-2xl font-bold text-indigo-600">
              <DollarSign className="w-6 h-6" />
              <span>{event.ticketPrice}</span>
              <span className="text-sm font-normal text-gray-500 ml-1">
                / ticket
              </span>
            </div>

            <button
              onClick={handleBookTicket}
              disabled={event.availableTickets <= 0}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
            >
              {event.availableTickets > 0 ? "Book Now" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
