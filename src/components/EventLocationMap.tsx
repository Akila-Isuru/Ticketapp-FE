import React from "react";
import { MapPin, Navigation } from "lucide-react";

interface EventLocationMapProps {
  location: string;
}

const EventLocationMap: React.FC<EventLocationMapProps> = ({ location }) => {
  const encodedLocation = encodeURIComponent(location);

  const embedUrl = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-indigo-500" /> Location
        </h3>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <Navigation className="w-3.5 h-3.5" /> Get Directions
        </a>
      </div>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl overflow-hidden border border-gray-200 relative group"
      >
        <iframe
          title="Event location map"
          src={embedUrl}
          width="100%"
          height="420"
          style={{ border: 0, pointerEvents: "none" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition bg-white text-slate-800 text-sm font-medium px-4 py-2 rounded-lg shadow-md">
            Click to get directions from your location
          </span>
        </div>
      </a>
    </div>
  );
};

export default EventLocationMap;
