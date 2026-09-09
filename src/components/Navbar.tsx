import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Calendar, LogOut, ShieldCheck, Ticket, User } from "lucide-react";

function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userRole = role || localStorage.getItem("role") || "";
  const isAdmin = userRole.toUpperCase().includes("ADMIN");

  return (
    <nav className="bg-white text-slate-800 px-6 py-4 flex justify-between items-center shadow-sm border-b border-gray-200">
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
          className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition"
        >
          <Calendar className="w-4 h-4" />
          <span>Events</span>
        </Link>

        {token ? (
          <>
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-orange-500 font-medium hover:text-orange-600 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            )}

            <Link
              to="/my-bookings"
              className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition"
            >
              <User className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
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
  );
}

export default Navbar;
