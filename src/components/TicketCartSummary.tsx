import React from "react";

interface TicketCartSummaryProps {
  totalTickets: number;
  totalAmount: number;
  onCheckout: () => void;
  disabled: boolean;
}

const TicketCartSummary: React.FC<TicketCartSummaryProps> = ({
  totalTickets,
  totalAmount,
  onCheckout,
  disabled,
}) => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">
          {totalTickets} ticket{totalTickets !== 1 ? "s" : ""} selected
        </span>
        <span className="text-xl font-bold text-indigo-600">
          LKR {totalAmount.toLocaleString()}
        </span>
      </div>

      <button
        onClick={onCheckout}
        disabled={disabled}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
      >
        Checkout
      </button>
    </div>
  );
};

export default TicketCartSummary;
