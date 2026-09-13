import React from "react";
import {
  Calendar,
  Ticket,
  DollarSign,
  CheckCircle,
  Clock,
  QrCode,
} from "lucide-react";
import type { Booking } from "../types";

interface BookingCardProps {
  booking: Booking;
  onPayNow: (booking: Booking) => void;
  onCancel: (bookingId: number) => void;
  onViewQRCode: (booking: Booking) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPayNow,
  onCancel,
  onViewQRCode,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold text-slate-800">
            {booking.eventTitle}
          </h2>
          <span
            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1 ${
              booking.paymentStatus === "PAID"
                ? "bg-green-100 text-green-700"
                : booking.paymentStatus === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {booking.paymentStatus === "PAID" && (
              <CheckCircle className="w-3 h-3" />
            )}
            {booking.paymentStatus === "PENDING" && (
              <Clock className="w-3 h-3" />
            )}
            {booking.paymentStatus}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
          <span className="flex items-center gap-1">
            <Ticket className="w-4 h-4 text-indigo-500" /> {booking.ticketCount}{" "}
            Tickets
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <DollarSign className="w-4 h-4 text-green-600" /> Total: LKR{" "}
            {booking.totalAmount}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />{" "}
            {new Date(booking.bookingTime).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {booking.paymentStatus === "PENDING" && (
          <button
            onClick={() => onPayNow(booking)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            Pay Now
          </button>
        )}

        {booking.paymentStatus === "PAID" && (
          <button
            onClick={() => onViewQRCode(booking)}
            className="flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            <QrCode className="w-4 h-4" /> View QR Ticket
          </button>
        )}

        {booking.paymentStatus !== "CANCELLED" && (
          <button
            onClick={() => onCancel(booking.bookingId)}
            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
