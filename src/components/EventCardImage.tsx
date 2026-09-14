import React from "react";
import { Heart } from "lucide-react";

interface EventCardImageProps {
  imageUrl: string;
  title: string;
}

const EventCardImage: React.FC<EventCardImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="relative w-full h-44 bg-gray-100">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
          No Image
        </div>
      )}

      <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-black/40 flex items-center justify-center">
        <Heart className="w-3.5 h-3.5 text-white" />
      </span>
    </div>
  );
};

export default EventCardImage;
