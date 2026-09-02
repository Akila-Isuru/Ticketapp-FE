import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Link එක react-router-dom එකෙන් import කළා
import { AuthContext } from "../context/AuthContext";
import { Calendar, LogOut, ShieldCheck, Ticket, User } from "lucide-react";

function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* 1. App Logo / Name */}
      <Link
        to="/"
        className="flex items-center gap-2 text-xl font-bold text-blue-400 hover:opacity-90"
      >
        <Ticket className="w-6 h-6" />
        <span>TicketApp</span>
      </Link>

      {/* 2. Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-blue-400 transition"
        >
          <Calendar className="w-4 h-4" />
          <span>Events</span>
        </Link>

        {token ? (
          <>
            {role === "ROLE_ADMIN" && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-yellow-400 font-medium hover:text-yellow-300 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            )}

            <Link
              to="/my-bookings"
              className="flex items-center gap-1 hover:text-blue-400 transition"
            >
              <User className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
