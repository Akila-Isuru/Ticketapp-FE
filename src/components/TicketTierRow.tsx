import React from "react";
import type { TicketTier } from "../types";

interface TicketTierRowProps {
  tier: TicketTier;
  quantity: number;
  onQuantityChange: (tierId: number, quantity: number) => void;
}

const TicketTierRow: React.FC<TicketTierRowProps> = ({
  tier,
  quantity,
  onQuantityChange,
}) => {
  const soldOut = tier.availableCount <= 0;

  return (
    <div className="flex items-center justify-between border border-gray-200 rounded-xl p-4">
      <div>
        <p className="font-semibold text-slate-800">{tier.name}</p>
        <p className="text-sm text-gray-500">
          LKR {tier.price} ·{" "}
          {soldOut ? "Sold out" : `${tier.availableCount} left`}
        </p>
      </div>

      {!soldOut && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuantityChange(tier.id, Math.max(0, quantity - 1))}
            className="w-7 h-7 rounded-full border border-gray-300 text-slate-600 hover:bg-gray-50 cursor-pointer"
          >
            −
          </button>
          <span className="w-6 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              onQuantityChange(
                tier.id,
                Math.min(tier.availableCount, quantity + 1),
              )
            }
            className="w-7 h-7 rounded-full border border-gray-300 text-slate-600 hover:bg-gray-50 cursor-pointer"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketTierRow;
