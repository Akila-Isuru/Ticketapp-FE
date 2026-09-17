import React from "react";
import { Trash2 } from "lucide-react";
import type { TicketTier } from "../types";

interface AdminTierListItemProps {
  tier: TicketTier;
  onDelete: (tier: TicketTier) => void;
}

const AdminTierListItem: React.FC<AdminTierListItemProps> = ({
  tier,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200">
      <div>
        <p className="font-semibold text-slate-800">{tier.name}</p>
        <p className="text-sm text-gray-500">
          LKR {tier.price} · {tier.availableCount} / {tier.totalCount} left
        </p>
      </div>

      <button
        onClick={() => onDelete(tier)}
        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition cursor-pointer"
        title="Delete tier"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AdminTierListItem;
