import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../api";
import EventCard from "../components/EventCard";
import type { Event } from "../types";

const CATEGORY_TITLES: Record<string, string> = {
  CONCERT: "Concerts",
  THEATRE: "Theatre",
  SPORTS: "Sports",
};

const CategoryEventsPage: React.FC = () => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await API.get("/events");
        const allEvents: Event[] = response.data.data || [];
        setEvents(allEvents.filter((evt) => evt.category === categoryKey));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [categoryKey]);

  const title = CATEGORY_TITLES[categoryKey || ""] || "Events";

  return (
    <div className="max-w-6xl mx-auto my-8">
      <Link
        to="/"
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 mb-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">{title}</h1>

      {loading ? (
        <div className="text-center mt-12 text-slate-600 font-semibold">
          Loading Events...
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">
          No {title.toLowerCase()} events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryEventsPage;
