import FloatingSquares from "./components/FloatingSquares";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Learning from "./pages/Learning";
import EventDetail from "./pages/EventDetail";

import { events } from "./data/mockEvents.js";
import { getUpcomingEvents } from "./utils/getUpcomingEvents.js";
import { stats } from "./data/stats.js";
import { focusAreas } from "./data/focusAreas.js";
import { galleryItems } from "./data/mockgallery.js";

import { Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  const nextEvent = getUpcomingEvents(events, 1)?.[0] || null;
  const upcomingEvents = getUpcomingEvents(events, 3) || [];

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
