import React, { useEffect, useState } from "react";
import API from "../api";
import FeaturedCarouselSlide from "./FeaturedCarouselSlide";
import type { Event } from "../types";

const FeaturedCarousel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get("/events");
        setEvents((response.data.data || []).slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch featured events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [events.length]);

  if (events.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="relative w-full h-[420px] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out gap-4"
          style={{
            transform: `translateX(calc(-${activeIndex} * (100% - 3rem) - ${activeIndex} * 1rem))`,
          }}
        >
          {events.map((evt) => (
            <div
              key={evt.id}
              className="w-[calc(100%-3rem)] h-full flex-shrink-0"
            >
              <FeaturedCarouselSlide event={evt} />
            </div>
          ))}
        </div>
      </div>

      {events.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                index === activeIndex
                  ? "w-6 bg-indigo-600"
                  : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCarousel;
