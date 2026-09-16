import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import {
  Calendar,
  LogOut,
  ShieldCheck,
  Ticket,
  User,
  ChevronDown,
} from "lucide-react";
import NavCategoryDropdown from "./NavCategoryDropdown";
import type { Event } from "../types";

const CATEGORIES = [
  { key: "CONCERT", label: "Concerts" },
  { key: "THEATRE", label: "Theatre" },
  { key: "SPORTS", label: "Sports" },
];

function Navbar() {
  const { token, role, email, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get("/events");
        setEvents(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch events for navbar:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  const userRole = role || localStorage.getItem("role") || "";
  const isAdmin = userRole.toUpperCase().includes("ADMIN");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 px-4 pt-4 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-32"
      }`}
    >
      <nav className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md text-slate-800 px-6 py-5 flex justify-between items-center rounded-2xl shadow-sm border border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-indigo-600 hover:opacity-90"
        >
          <Ticket className="w-6 h-6" />
          <span>TuneTix</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition text-sm font-medium"
          >
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </Link>

          {CATEGORIES.map((cat) => (
            <NavCategoryDropdown
              key={cat.key}
              label={cat.label}
              events={events.filter((evt) => evt.category === cat.key)}
            />
          ))}

          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full pl-2 pr-3 py-1.5 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                  {email ? (
                    email.charAt(0).toUpperCase()
                  ) : (
                    <User className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[140px] truncate">
                  {email}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50 transition"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition"
                  >
                    <User className="w-4 h-4" />
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-indigo-600 hover:text-indigo-700 px-4 py-1.5 rounded-md text-sm font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
