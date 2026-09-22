import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Zap, Headphones, Play } from "lucide-react";
import API from "../api";
import HeroEventStack from "./HeroEventStack";
import HeroTagline from "./HeroTagline";
import type { Event } from "../types";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [swapping, setSwapping] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const swapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get("/events");
        const fetched: Event[] = (response.data.data || []).slice(0, 5);
        setEvents(fetched);
        setOrder(fetched.map((_, i) => i));
      } catch (error) {
        console.error("Failed to fetch events for hero:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      setSwapping(true);
      setTaglineIndex((prev) => (prev + 1) % 4);

      swapTimeout.current = setTimeout(() => {
        setOrder((prev) => [...prev.slice(1), prev[0]]);
        setSwapping(false);
      }, 300);
    }, 2200);

    return () => {
      clearInterval(interval);
      if (swapTimeout.current) clearTimeout(swapTimeout.current);
    };
  }, [events.length]);

  const scrollToEvents = () => {
    const section = document.getElementById("events-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20 px-6 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
        {/* ---- LEFT: text content ---- */}
        <div className="animate-hero-fade-up">
          <HeroTagline index={taglineIndex} />

          <p className="text-slate-500 text-base md:text-lg max-w-xl mb-9 leading-relaxed">
            Sri Lanka's home for live music, theatre, and the moments in
            between. Discover what's on, lock in your seat in seconds.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={scrollToEvents}
              className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-lg transition shadow-sm hover:shadow-md cursor-pointer"
            >
              Browse all events
              <span className="transition-transform group-hover:translate-x-0.5 text-lg leading-none">
                ›
              </span>
            </button>

            <button
              onClick={scrollToEvents}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium px-6 py-3.5 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <Play className="w-3 h-3 text-white fill-current" />
              </span>
              View event
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Secure Payments
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Instant Ticket Delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <Headphones className="w-4 h-4 text-indigo-400" />
              24/7 Support
            </span>
          </div>
        </div>

        <HeroEventStack order={order} events={events} swapping={swapping} />
      </div>
    </section>
  );
};

export default Hero;
