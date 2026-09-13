import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import BookingCard from "../components/BookingCard";
import { openMockPaymentModal } from "../utils/paymentModal";
import type { Booking } from "../types";

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  const fetchMyBookings = async () => {
    try {
      let userId = 1;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        userId = payload.userId || payload.id || 1;
      }
      const response = await API.get(`/bookings/user/${userId}`);
      setBookings(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, [token]);

  const handlePayNow = async (booking: Booking) => {
    const success = await openMockPaymentModal(
      booking.bookingId,
      booking.eventTitle,
      booking.totalAmount,
      {
        cancelButtonText: "Cancel",
        successMessage: "Your payment has been processed.",
        errorTitle: "Error",
      },
    );

    if (success) {
      fetchMyBookings();
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await API.put(`/bookings/cancel/${bookingId}`);
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        fetchMyBookings();
      } catch (error: any) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to cancel",
          "error",
        );
      }
    }
  };

  const handleViewQRCode = async (booking: Booking) => {
    try {
      const response = await API.get(`/bookings/${booking.bookingId}/qrcode`, {
        responseType: "blob",
      });

      const imageUrl = URL.createObjectURL(response.data);

      Swal.fire({
        title: "Your Ticket QR Code",
        html: `<p style="color:#6b7280; font-size:13px; margin-bottom:12px;">${booking.eventTitle} — ${booking.orderId}</p>`,
        imageUrl: imageUrl,
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: "Booking QR Code",
        confirmButtonText: "Close",
        confirmButtonColor: "#4f46e5",
      });
    } catch (error) {
      Swal.fire("Error", "Failed to load QR code", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-12 text-slate-600 font-semibold">
        Loading Bookings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
          You haven't booked any tickets yet.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <BookingCard
              key={b.bookingId}
              booking={b}
              onPayNow={handlePayNow}
              onCancel={handleCancelBooking}
              onViewQRCode={handleViewQRCode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
