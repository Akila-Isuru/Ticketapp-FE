import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { MapPin, ArrowLeft } from "lucide-react";
import EventBookingCard from "../components/EventBookingCard";
import EventLocationMap from "../components/EventLocationMap";
import EventTransportLinks from "../components/EventTransportLinks";
import EventPolicies from "../components/EventPolicies";
import TicketSelectionModal from "../components/TicketSelectionModal";
import { openMockPaymentModal } from "../utils/paymentModal";
import type { Event, TicketTier } from "../types";

const EventDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [event, setEvent] = useState<Event | null>(null);
  const [tiers, setTiers] = useState<TicketTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTierModal, setShowTierModal] = useState(false);

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

  const fetchTiers = async () => {
    try {
      const response = await API.get(`/events/${id}/tiers`);
      setTiers(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tiers:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    fetchTiers();
  }, [id]);

  const handleSimpleBooking = async () => {
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

  const handleGetTicketsClick = () => {
    if (tiers.length > 0) {
      setShowTierModal(true);
    } else {
      handleSimpleBooking();
    }
  };

  const handleTierCheckout = async (
    selections: { tierId: number; quantity: number }[],
  ) => {
    if (!event || selections.length === 0) return;

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

    const selection = selections[0]; // single tier per booking, kept simple

    try {
      const response = await API.post("/bookings", {
        userId,
        eventId: event.id,
        ticketCount: selection.quantity,
        tierId: selection.tierId,
      });

      const bookingData = response.data.data;

      setShowTierModal(false);

      await openMockPaymentModal(
        bookingData.bookingId,
        bookingData.eventTitle,
        bookingData.totalAmount,
      );

      fetchEvent();
      fetchTiers();
      navigate("/my-bookings");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.message || "Failed to complete booking.",
      });
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

  return (
    <div className="max-w-6xl mx-auto my-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 mb-6 text-sm font-medium cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </button>

      <div className="w-full h-[420px] rounded-xl overflow-hidden bg-gray-100 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-3">
              {event.title}
            </h1>

            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <span>{event.location}</span>
            </div>
          </div>

          <EventPolicies />

          <EventLocationMap location={event.location} />

          <EventTransportLinks />
        </div>

        <EventBookingCard
          event={event}
          tiers={tiers}
          onGetTickets={handleGetTicketsClick}
        />
      </div>

      {showTierModal && (
        <TicketSelectionModal
          event={event}
          tiers={tiers}
          onClose={() => setShowTierModal(false)}
          onCheckout={handleTierCheckout}
        />
      )}
    </div>
  );
};

export default EventDetails;
