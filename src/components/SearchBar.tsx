import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchWord: string;
  onSearchWordChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchWord,
  onSearchWordChange,
  onSearch,
  onClear,
}) => {
  return (
    <form
      onSubmit={onSearch}
      className="flex justify-center gap-2 mb-8 max-w-md mx-auto"
    >
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchWord}
          onChange={(e) => onSearchWordChange(e.target.value)}
          placeholder="Search by event name or location..."
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
      >
        Search
      </button>
      {searchWord && (
        <button
          type="button"
          onClick={onClear}
          className="bg-gray-100 hover:bg-gray-200 text-slate-600 px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;
