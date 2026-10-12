import { supabase } from "../lib/supabaseClient.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { events as defaultMockEvents } from "../data/mockEvents.js";
import {
  Calendar,
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: true });

        if (error || !data || data.length === 0) {
          // Gracefully fallback to mock events
          setEventsList(defaultMockEvents);
          if (error) setError(error);
        } else {
          setEventsList(data);
        }
      } catch (err) {
        console.warn("Network error fetching Supabase events, using mock events:", err);
        setEventsList(defaultMockEvents);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusStyles = {
    upcoming: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    completed: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
  };

  const filteredEvents = eventsList.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ? true : event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hackathons, Contests & Meetups</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
          CodeClub Events
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Test your programming skills, build working prototypes with teammates,
          and compete for campus glory in our university-wide events.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-brand-surface border border-brand-border p-3 sm:p-4 rounded-2xl">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-bg border border-brand-border rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Events" },
            { id: "upcoming", label: "Upcoming" },
            { id: "completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? "bg-brand-accent text-brand-bg font-semibold shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  : "bg-brand-bg border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-brand-surface/60 border border-brand-border animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredEvents.length === 0 && (
        <div className="rounded-2xl border border-brand-border bg-brand-surface/40 p-12 text-center max-w-md mx-auto">
          <Calendar className="w-12 h-12 text-brand-muted mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-semibold text-brand-text mb-1">
            No events match your search
          </h3>
          <p className="text-xs text-brand-muted mb-4">
            Try adjusting your search query or switching filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
            }}
            className="px-4 py-2 text-xs font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Events Grid */}
      {!loading && filteredEvents.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="group relative flex flex-col justify-between bg-brand-surface border border-brand-border hover:border-brand-accent/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/5"
            >
              {/* Event Cover or Gradient Banner */}
              <div className="relative h-44 w-full bg-brand-bg overflow-hidden">
                {event.cover_image_url ? (
                  <img
                    src={event.cover_image_url}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-surface via-brand-border to-brand-bg flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-brand-accent/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-black/30" />

                {/* Status Pill */}
                <span
                  className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize backdrop-blur-md ${
                    statusStyles[event.status] || statusStyles.completed
                  }`}
                >
                  {event.status}
                </span>

                {/* Date Tag */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-brand-text font-mono bg-brand-bg/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-brand-border/60">
                  <Calendar className="w-3 h-3 text-brand-accent" />
                  <span>{formatDate(event.event_date)}</span>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors mb-2 line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed mb-4">
                    {event.description ||
                      "Join CodeClub members for this official campus session. Build, collaborate, and win."}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-accent">
                  <span>View Details & Media</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
