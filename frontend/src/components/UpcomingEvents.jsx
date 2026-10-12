import { getUpcomingEvents } from "../utils/getUpcomingEvents";
import { Link } from "react-router-dom";

export default function UpcomingEvents({ upcomingEvents }) {
    // const upcomingEvents = getUpcomingEvents(events, 3) || [];

    return (
      <section className="w-full max-w-6xl mx-auto px-6 py-30">
        <h2 className="text-3xl font-bold text-brand-text mb-8 text-center ">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {upcomingEvents.map((event, index) => {
            return (
              <div
                key={index}
                className="bg-brand-stats-bg backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-6 border border-transparent hover:border-brand-accent/50 transition-all hover:scale-105 z-10"
              >
                <p className="text-sm text-brand-accent font-mono mb-2">
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-xl font-semibold text-brand-text mb-2">
                  {event.title}
                </h3>
                <p className="text-brand-muted">{event.description}</p>
                <div className="mt-2">
                  <Link
                    to="/events"
                    className="text-sm font-semibold text-brand-accent hover:text-white transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    View event →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
}