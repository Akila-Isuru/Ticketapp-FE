import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Headphones } from "lucide-react";
import API from "../api";
import HeroBackground from "./HeroBackground";
import HeroEventBadge from "./HeroEventBadge";
import HeroProgressDots from "./HeroProgressDots";
import type { Event } from "../types";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get("/events");
        setEvents((response.data.data || []).slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch events for hero:", error);
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

  const scrollToEvents = () => {
    const section = document.getElementById("events-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeEvent = events[activeIndex];

  return (
    <div
      className="relative w-screen h-[85vh] min-h-[560px] mb-10 overflow-hidden"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      {activeEvent && (
        <HeroBackground events={events} activeIndex={activeIndex} />
      )}

      {!activeEvent && (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-800" />
      )}

      <div className="relative h-full flex flex-col justify-between p-8 md:p-16 max-w-6xl mx-auto">
        <div className="animate-hero-title mt-8 md:mt-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-5 max-w-2xl">
            Your next <span className="italic text-orange-400">show</span>{" "}
            starts here.
          </h1>

          <p className="text-white/80 text-lg md:text-xl max-w-lg mb-8">
            Sri Lanka's home for live music. Discover what's on and lock in your
            seat in seconds.
          </p>

          <button
            onClick={scrollToEvents}
            className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-7 py-3.5 rounded-lg transition cursor-pointer text-base"
          >
            Browse Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center gap-6 mt-10 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-orange-400" /> Secure
              Payments
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-400" /> Instant Delivery
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-4 h-4 text-orange-400" /> 24/7 Support
            </span>
          </div>
        </div>

        {activeEvent && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <HeroEventBadge event={activeEvent} />

            {events.length > 1 && (
              <HeroProgressDots
                count={events.length}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
