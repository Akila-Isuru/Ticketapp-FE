import React, { useState } from "react";
import TicketTierRow from "./TicketTierRow";
import TicketCartSummary from "./TicketCartSummary";
import type { TicketTier } from "../types";

interface TicketTierSelectorProps {
  tiers: TicketTier[];
  onCheckout: (selections: { tierId: number; quantity: number }[]) => void;
}

const TicketTierSelector: React.FC<TicketTierSelectorProps> = ({
  tiers,
  onCheckout,
}) => {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const handleQuantityChange = (tierId: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [tierId]: quantity }));
  };

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);

  const totalAmount = tiers.reduce((sum, tier) => {
    const qty = quantities[tier.id] || 0;
    return sum + qty * tier.price;
  }, 0);

  const handleCheckoutClick = () => {
    const selections = Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([tierId, quantity]) => ({ tierId: Number(tierId), quantity }));

    onCheckout(selections);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-3">Select Tickets</h3>

      <div className="space-y-3">
        {tiers.map((tier) => (
          <TicketTierRow
            key={tier.id}
            tier={tier}
            quantity={quantities[tier.id] || 0}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>

      <TicketCartSummary
        totalTickets={totalTickets}
        totalAmount={totalAmount}
        onCheckout={handleCheckoutClick}
        disabled={totalTickets === 0}
      />
    </div>
  );
};

export default TicketTierSelector;
