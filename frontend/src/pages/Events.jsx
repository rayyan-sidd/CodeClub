import { supabase } from "../lib/supabaseClient.js";
import { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      setLoading(false);
      if (error) {
        console.error("Error fetching events:", error.message);
        setError(error);
      } else {
        setEvents(data);
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
    upcoming: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    completed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-white mb-10">Events</h2>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-zinc-800/50 animate-pulse"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-red-400 font-medium">Couldn't load events</p>
          <p className="text-zinc-500 text-sm mt-1">{error.message}</p>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="rounded-xl border border-zinc-800 p-10 text-center">
          <p className="text-zinc-400">No events yet — check back soon.</p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg font-semibold text-white">
                  {event.title}
                </h3>
                <span
                  className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${
                    statusStyles[event.status] || statusStyles.completed
                  }`}
                >
                  {event.status}
                </span>
              </div>

              {event.description && (
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
              )}

              <p className="text-zinc-500 text-sm">
                {formatDate(event.event_date)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
