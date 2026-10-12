import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles, Trophy, Camera } from "lucide-react";

export default function UpcomingEvents({ upcomingEvents = [] }) {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 z-10" aria-label="Upcoming Events">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Campus Calendar</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-3">
          Upcoming Events
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          Mark your calendar for campus hackathons, debugging tournaments, and technical speaker sessions.
        </p>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto border border-brand-border/80 shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent mx-auto mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Trophy className="w-7 h-7" />
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            3 Major Tournaments Completed
          </span>

          <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">
            Next Major Tournament In Planning
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted mb-6 max-w-md mx-auto leading-relaxed">
            Our recent contests — <strong>Orientation'26</strong>, <strong>Club Day</strong>, and <strong>Code Clash League</strong> — have wrapped up. Explore the full recap and live photo archives!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105"
            >
              <Camera className="w-4 h-4" />
              <span>Explore Tournament Photo Archive (66+ Photos)</span>
            </Link>

            <Link
              to="/practice"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-brand-text bg-brand-surface border border-brand-border hover:border-brand-accent/50 rounded-xl transition-all cursor-pointer"
            >
              <span>Practice Today's Problem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id || index}
              className="glass-panel-glow rounded-3xl p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2.5 py-1 rounded-md">
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Upcoming
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-text mb-2 line-clamp-1 group-hover:text-brand-accent transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-3 mb-6 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-border/60">
                <Link
                  to={`/events/${event.id}`}
                  className="text-xs font-semibold text-brand-accent hover:text-white transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details & Register</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}