import React from "react";
import { TIME_FILTERS } from "../utils/eventDateFilters";

interface NavTimeFilterListProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const NavTimeFilterList: React.FC<NavTimeFilterListProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col gap-1 w-36 flex-shrink-0 border-r border-gray-100 pr-3">
      {TIME_FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`text-left text-sm px-3 py-2 rounded-lg transition cursor-pointer ${
            activeFilter === filter
              ? "bg-indigo-50 text-indigo-600 font-medium"
              : "text-slate-600 hover:bg-gray-50"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default NavTimeFilterList;
