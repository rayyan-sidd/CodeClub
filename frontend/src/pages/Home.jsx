import Hero from "../components/Hero";
import About from "../components/About";
import StatsStrip from "../components/StatsStrip";
import FocusAreas from "../components/FocusAreas";
import Gallery from "../components/Gallery";
import UpcomingEvents from "../components/UpcomingEvents";

export default function Home({ nextEvent, stats, focusAreas, upcomingEvents }) {
  return (
    <>
      <Hero nextEvent={nextEvent} />
      <StatsStrip stats={stats} />
      <FocusAreas focusAreas={focusAreas} />
      <Gallery />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
      <About />
    </>
  );
}