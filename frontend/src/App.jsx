import { useState, useEffect } from "react";
import FloatingSquares from "./components/FloatingSquares";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Learning from "./pages/Learning";
import EventDetail from "./pages/EventDetail";

import { supabase } from "./lib/supabaseClient.js";
import { stats } from "./data/stats.js";
import { focusAreas } from "./data/focusAreas.js";
import { galleryItems } from "./data/mockgallery.js";

import { Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  const [nextEvent, setNextEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fetch real upcoming events directly from Supabase
  useEffect(() => {
    async function fetchUpcoming() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("status", "upcoming")
          .order("event_date", { ascending: true })
          .limit(3);

        if (!error && data && data.length > 0) {
          setNextEvent(data[0]);
          setUpcomingEvents(data);
        } else {
          setNextEvent(null);
          setUpcomingEvents([]);
        }
      } catch (err) {
        setNextEvent(null);
        setUpcomingEvents([]);
      }
    }
    fetchUpcoming();
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text relative flex flex-col justify-between overflow-x-hidden">
      <ScrollToTop />
      <Navbar />

      <main className="flex-grow flex flex-col items-center w-full pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                nextEvent={nextEvent}
                stats={stats}
                focusAreas={focusAreas}
                galleryItems={galleryItems}
                upcomingEvents={upcomingEvents}
              />
            }
          />
          <Route path="/practice" element={<Practice />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/gallery" element={<Navigate to="/events" replace />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </main>

      <Footer />
      <FloatingSquares />
    </div>
  );
}
