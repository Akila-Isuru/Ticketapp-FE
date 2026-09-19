import React, { useEffect, useState, useRef } from "react";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import API from "../api";
import RecentlyViewedCard from "./RecentlyViewedCard";
import { getRecentlyViewedIds } from "../utils/recentlyViewed";
import type { Event } from "../types";

const RecentlyViewedSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = getRecentlyViewedIds();
    if (ids.length === 0) return;

    const fetchViewedEvents = async () => {
      try {
        const results = await Promise.all(
          ids.map((id) =>
            API.get(`/events/${id}`)
              .then((res) => res.data.data)
              .catch(() => null),
          ),
        );
        setEvents(results.filter(Boolean));
      } catch (error) {
        console.error("Failed to load recently viewed events:", error);
      }
    };

    fetchViewedEvents();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (events.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-slate-800">Recently Viewed</h2>
          <span className="text-gray-400 text-sm">
            | {events.length} Event{events.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-gray-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-slate-500 hover:bg-gray-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {events.map((evt) => (
          <RecentlyViewedCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedSection;
