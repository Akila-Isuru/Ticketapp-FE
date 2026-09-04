import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { Calendar, Ticket, DollarSign, CheckCircle, Clock } from "lucide-react";
import Swal from "sweetalert2";

interface Booking {
  bookingId: number;
  orderId: string;
  merchantId: string;
  eventTitle: string;
  ticketCount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  bookingTime: string;
}

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
    const { value: formValues } = await Swal.fire({
      title: "💳 Mock Payment Gateway",
      html: `
        <div style="text-align: left; font-size: 14px;">
          <p style="margin-bottom: 8px; color: #4b5563;"><strong>Event:</strong> ${booking.eventTitle}</p>
          <p style="margin-bottom: 16px; color: #16a34a; font-weight: bold; font-size: 16px;"><strong>Total:</strong> LKR ${booking.totalAmount}</p>

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
      confirmButtonText: `Pay LKR ${booking.totalAmount}`,
      confirmButtonColor: "#16a34a",
      cancelButtonText: "Cancel",
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
        await API.put(`/bookings/pay/${booking.bookingId}`);
        Swal.fire(
          "Payment Successful!",
          "Your payment has been processed.",
          "success",
        );
        fetchMyBookings();
      } catch (error: any) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Payment failed",
          "error",
        );
      }
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
            <div
              key={b.bookingId}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-slate-800">
                    {b.eventTitle}
                  </h2>
                  <span
                    className={`px-2.5 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1 ${
                      b.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : b.paymentStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.paymentStatus === "PAID" && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {b.paymentStatus === "PENDING" && (
                      <Clock className="w-3 h-3" />
                    )}
                    {b.paymentStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Ticket className="w-4 h-4 text-blue-500" /> {b.ticketCount}{" "}
                    Tickets
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <DollarSign className="w-4 h-4 text-green-600" /> Total: LKR{" "}
                    {b.totalAmount}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />{" "}
                    {new Date(b.bookingTime).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {b.paymentStatus === "PENDING" && (
                  <button
                    onClick={() => handlePayNow(b)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    Pay Now
                  </button>
                )}

                {b.paymentStatus !== "CANCELLED" && (
                  <button
                    onClick={() => handleCancelBooking(b.bookingId)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
