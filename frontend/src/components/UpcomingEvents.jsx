import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

export default function UpcomingEvents({ upcomingEvents = [] }) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">
        Upcoming Events
      </h2>

      {upcomingEvents.length === 0 ? (
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 sm:p-10 text-center max-w-xl mx-auto shadow-lg">
          <Calendar className="w-10 h-10 text-brand-accent/50 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-brand-text mb-1">
            No Upcoming Events Scheduled
          </h3>
          <p className="text-xs text-brand-muted mb-4">
            New hackathons, competitive leagues, and technical bootcamps will be announced here soon.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:underline"
          >
            <span>Explore Past Event Recaps & Media Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id || index}
              className="bg-brand-stats-bg backdrop-filter backdrop-blur-sm rounded-2xl shadow-md p-6 border border-brand-border hover:border-brand-accent/50 transition-all hover:scale-105 z-10 flex flex-col justify-between"
            >
              <div>
                <p className="text-sm text-brand-accent font-mono mb-2">
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-xl font-semibold text-brand-text mb-2 line-clamp-1">
                  {event.title}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-3 mb-4 leading-relaxed">
                  {event.description}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to={`/events/${event.id}`}
                  className="text-xs font-semibold text-brand-accent hover:text-white transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  View Event Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}