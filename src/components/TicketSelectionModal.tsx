import React from "react";
import { X } from "lucide-react";
import TicketTierSelector from "./TicketTierSelector";
import type { Event, TicketTier } from "../types";

interface TicketSelectionModalProps {
  event: Event;
  tiers: TicketTier[];
  onClose: () => void;
  onCheckout: (selections: { tierId: number; quantity: number }[]) => void;
}

const TicketSelectionModal: React.FC<TicketSelectionModalProps> = ({
  event,
  tiers,
  onClose,
  onCheckout,
}) => {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = new Date(event.eventDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <p className="font-bold text-slate-800">{event.title}</p>
              <p className="text-xs text-gray-500">
                {formattedDate} · {formattedTime}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <TicketTierSelector tiers={tiers} onCheckout={onCheckout} />
        </div>
      </div>
    </div>
  );
};

export default TicketSelectionModal;
