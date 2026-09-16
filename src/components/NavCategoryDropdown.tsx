import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import NavTimeFilterList from "./NavTimeFilterList";
import NavEventPreviewList from "./NavEventPreviewList";
import { filterEventsByTime } from "../utils/eventDateFilters";
import type { Event } from "../types";

interface NavCategoryDropdownProps {
  label: string;
  events: Event[];
}

const NavCategoryDropdown: React.FC<NavCategoryDropdownProps> = ({
  label,
  events,
}) => {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Top events");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEvents = filterEventsByTime(events, activeFilter);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition text-sm font-medium cursor-pointer"
      >
        <span>{label}</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>

      {open && (
        <div className="absolute left-0 mt-3 w-[420px] bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-4 z-10 flex gap-4">
          <NavTimeFilterList
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
              {label}
            </h4>

            <NavEventPreviewList
              events={filteredEvents}
              onLinkClick={() => setOpen(false)}
            />

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-2 pt-2 border-t border-gray-100"
            >
              View all {label.toLowerCase()}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavCategoryDropdown;
