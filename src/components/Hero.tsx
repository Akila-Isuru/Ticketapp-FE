import React from "react";
import { useNavigate } from "react-router-dom";
import { Music2 } from "lucide-react";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollToEvents = () => {
    const section = document.getElementById("events-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-16 px-6 text-center rounded-2xl mb-10">
      <div className="flex justify-center mb-4">
        <div className="bg-indigo-100 p-3 rounded-full">
          <Music2 className="w-8 h-8 text-indigo-600" />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
        Your next <span className="italic text-indigo-600">show</span> starts
        here.
      </h1>

      <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-8">
        Sri Lanka's home for live music. Discover upcoming concerts and lock in
        your seat in seconds.
      </p>

      <button
        onClick={scrollToEvents}
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition cursor-pointer"
      >
        Browse Events
      </button>
    </div>
  );
};

export default Hero;
