import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import type { Event } from "../types";

interface CategorySectionProps {
  title: string;
  categoryKey: string;
  events: Event[];
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  categoryKey,
  events,
}) => {
  const categoryEvents = events.filter((evt) => evt.category === categoryKey);

  if (categoryEvents.length === 0) return null;

  const previewEvents = categoryEvents.slice(0, 4);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <span className="text-gray-400 text-sm">
            | {categoryEvents.length} Event
            {categoryEvents.length !== 1 ? "s" : ""}
          </span>
        </div>

        <Link
          to={`/category/${categoryKey}`}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          All Events
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {previewEvents.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
