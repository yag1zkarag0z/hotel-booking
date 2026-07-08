import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";
import Toast from "./components/Toast";
import OwnerDashboard from "./pages/OwnerDashboard";

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isOwnerPath = location.pathname.includes("owner");

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="loading-ring" />
          <h1 className="text-2xl font-semibold tracking-[0.3em] text-white">
             QUICKSTAY
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Preparing your escape...
          </p>
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toast />
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
