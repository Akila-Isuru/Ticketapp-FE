import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Home = () => (
  <div className="p-8 text-xl font-semibold">Events List Page</div>
);
const MyBookings = () => (
  <div className="p-8 text-xl font-semibold">My Bookings Page</div>
);
const AdminDashboard = () => (
  <div className="p-8 text-xl font-semibold">Admin Dashboard</div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-slate-800">
        <Navbar />
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
