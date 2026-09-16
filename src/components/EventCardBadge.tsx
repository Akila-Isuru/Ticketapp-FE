import React from "react";
import { Crown } from "lucide-react";

interface EventCardBadgeProps {
  category: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  CONCERT: "Concert",
  THEATRE: "Theatre",
  SPORTS: "Sports",
};

const EventCardBadge: React.FC<EventCardBadgeProps> = ({ category }) => {
  const label = CATEGORY_LABELS[category] || category;

  return (
    <div className="flex items-center gap-2">
      <span className="bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
        {label}
      </span>
      <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
        <Crown className="w-3.5 h-3.5 text-green-600" />
      </span>
    </div>
  );
};

export default EventCardBadge;
