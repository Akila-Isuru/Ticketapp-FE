import React from "react";
import { useNavigate } from "react-router-dom";
import { Crown, ArrowRight } from "lucide-react";
import type { Event } from "../types";

interface FeaturedCarouselSlideProps {
  event: Event;
}

const CATEGORY_LABELS: Record<string, string> = {
  CONCERT: "Outdoor Musical Concert",
  THEATRE: "Theatre",
  SPORTS: "Sports",
};

const FeaturedCarouselSlide: React.FC<FeaturedCarouselSlideProps> = ({
  event,
}) => {
  const navigate = useNavigate();

  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  const categoryLabel = CATEGORY_LABELS[event.category] || event.category;

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <img
        src={event.imageUrl}
        alt={event.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <span className="absolute top-4 left-4 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
        <Crown className="w-4 h-4 text-green-600" />
      </span>

      <div className="absolute bottom-6 left-6">
        <p className="text-orange-400 text-xs font-semibold uppercase tracking-wide mb-1">
          {categoryLabel}
        </p>
        <h3 className="text-white text-3xl md:text-4xl font-serif font-bold">
          {event.title}
        </h3>
      </div>

      <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-64">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="col-span-2">
            <p className="text-white/60 text-[10px] uppercase tracking-wide">
              Where
            </p>
            <p className="text-white text-sm font-semibold truncate">
              {event.location}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-wide">
              When
            </p>
            <p className="text-white text-sm font-semibold">{formattedDate}</p>
          </div>
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-wide">
              From
            </p>
            <p className="text-indigo-300 text-sm font-semibold">
              Rs {event.ticketPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(`/events/${event.id}`)}
          className="w-full flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition cursor-pointer"
        >
          Grab Your Tickets <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedCarouselSlide;
