import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";
import EventDetails from "./pages/EventDetails";
import AdminTierManagement from "./pages/AdminTierManagement";
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-slate-800 flex flex-col">
        <Navbar />
        <main className="container mx-auto p-6 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route
              path="/admin/events/:eventId/tiers"
              element={<AdminTierManagement />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
