import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Trophy,
  Search,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Camera,
} from "lucide-react";

export default function Events() {
  const [eventsList, setEventsList] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Fetch exclusively from Supabase
  useEffect(() => {
    async function fetchSupabaseData() {
      setLoading(true);
      setError(null);
      try {
        const [eventsRes, mediaRes] = await Promise.all([
          supabase
            .from("events")
            .select("*")
            .order("event_date", { ascending: false }),
          supabase
            .from("event_media")
            .select("*")
            .order("sort_order", { ascending: true }),
        ]);

        if (eventsRes.error) {
          setError(eventsRes.error);
        } else {
          setEventsList(eventsRes.data || []);
        }

        if (!mediaRes.error && mediaRes.data) {
          setMediaList(mediaRes.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSupabaseData();
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
    completed: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
    ongoing: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  };

  const filteredEvents = eventsList.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : event.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const activeMedia = lightboxIndex !== null ? mediaList[lightboxIndex] : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? mediaList.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) =>
      prev === mediaList.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, mediaList.length]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Integral University · Developer Community</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
          Events & Campus Media Hub
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Explore all our official campus hackathons, workshops, competitive leagues,
          and photo archives.
        </p>
      </div>

      {/* Supabase Error Notice (if any) */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-10 text-center max-w-2xl mx-auto">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-red-400 mb-1">
            Unable to connect to Supabase
          </h3>
          <p className="text-xs text-brand-muted">{error.message}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-brand-text">All Events</h2>
          <p className="text-xs text-brand-muted">
            {eventsList.length} total event{eventsList.length === 1 ? "" : "s"} recorded
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-brand-text focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-brand-surface p-1 rounded-xl border border-brand-border shrink-0">
            {[
              { id: "all", label: "All" },
              { id: "upcoming", label: "Upcoming" },
              { id: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-brand-accent text-brand-bg font-semibold"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-brand-surface border border-brand-border animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredEvents.length === 0 && (
        <div className="rounded-2xl border border-brand-border bg-brand-surface/40 p-12 text-center max-w-md mx-auto mb-20">
          <Calendar className="w-12 h-12 text-brand-muted mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-semibold text-brand-text mb-1">
            No events found
          </h3>
          <p className="text-xs text-brand-muted mb-4">
            No events match the current filter in the Supabase database.
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {filteredEvents.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="group relative flex flex-col justify-between bg-brand-surface border border-brand-border hover:border-brand-accent/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/5"
            >
              {/* Event Banner */}
              <div className="relative h-44 w-full bg-brand-bg overflow-hidden">
                {event.cover_image_url ? (
                  <img
                    src={event.cover_image_url}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-brand-surface via-brand-border to-brand-bg flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-brand-accent/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-black/30" />

                {/* Status Pill */}
                <span
                  className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border capitalize backdrop-blur-md ${
                    statusStyles[event.status?.toLowerCase()] || statusStyles.completed
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
                    {event.description || "Official CodeClub campus session."}
                  </p>
                </div>

                <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-accent">
                  <span>View Details & Photos</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Supabase Media Showcase (if media rows exist) */}
      {mediaList.length > 0 && (
        <section className="pt-10 border-t border-brand-border/60" id="media-showcase">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Event Photo Archive</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text mb-3">
              Campus Highlights
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Live photo uploads from events hosted by CodeClub IU Lucknow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaList.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-brand-surface border border-brand-border hover:border-brand-accent/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/5 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-bg">
                  <img
                    src={item.image_url}
                    alt={item.caption || "Event moment"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-black/20 opacity-80 group-hover:opacity-50 transition-opacity" />

                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-bg/80 backdrop-blur-md p-1.5 rounded-md text-brand-text border border-brand-border/60">
                    <Maximize2 className="w-4 h-4 text-brand-accent" />
                  </div>
                </div>

                {item.caption && (
                  <div className="p-4">
                    <p className="font-semibold text-brand-text text-sm group-hover:text-brand-accent transition-colors line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-brand-muted hover:text-white p-2 rounded-full bg-brand-surface/60 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {mediaList.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col rounded-2xl overflow-hidden bg-brand-surface border border-brand-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] w-full bg-black/60 flex items-center justify-center overflow-hidden">
              <img
                src={activeMedia.image_url}
                alt={activeMedia.caption || "Event moment"}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            {activeMedia.caption && (
              <div className="p-4 bg-brand-surface border-t border-brand-border text-sm text-brand-text font-medium">
                {activeMedia.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
