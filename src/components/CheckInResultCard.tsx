import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface CheckInResultCardProps {
  status: "success" | "error";
  message: string;
  eventTitle?: string;
  ticketCount?: number;
}

const CheckInResultCard: React.FC<CheckInResultCardProps> = ({
  status,
  message,
  eventTitle,
  ticketCount,
}) => {
  const isSuccess = status === "success";

  return (
    <div
      className={`w-full max-w-sm mx-auto mt-4 p-5 rounded-xl border ${
        isSuccess ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-center gap-3 mb-1">
        {isSuccess ? (
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        ) : (
          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
        )}
        <p
          className={`font-bold ${
            isSuccess ? "text-green-700" : "text-red-700"
          }`}
        >
          {isSuccess ? "Checked In" : "Scan Failed"}
        </p>
      </div>

      <p className="text-sm text-slate-600 ml-9">{message}</p>

      {isSuccess && eventTitle && (
        <div className="ml-9 mt-2 text-sm text-slate-700">
          <p>
            <span className="text-slate-400">Event:</span> {eventTitle}
          </p>
          {ticketCount !== undefined && (
            <p>
              <span className="text-slate-400">Tickets:</span> {ticketCount}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckInResultCard;
