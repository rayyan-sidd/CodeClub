import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { events as defaultEvents } from "../data/mockEvents.js";
import { galleryItems as defaultGalleryItems } from "../data/mockgallery.js";
import { supabase } from "../lib/supabaseClient.js";
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Trophy,
  Code2,
  Terminal,
  Layers,
  Search,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function Events() {
  const [eventsList, setEventsList] = useState(defaultEvents);
  const [galleryList, setGalleryList] = useState(defaultGalleryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [mediaCategory, setMediaCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Sync with Supabase if online
  useEffect(() => {
    async function fetchSupabaseData() {
      try {
        const { data: eventsData, error: eventsErr } = await supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: false });

        if (!eventsErr && eventsData && eventsData.length > 0) {
          setEventsList(eventsData);
        }

        const { data: mediaData, error: mediaErr } = await supabase
          .from("event_media")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!mediaErr && mediaData && mediaData.length > 0) {
          const formatted = mediaData.map((item, idx) => ({
            id: item.id || `sb-${idx}`,
            title: item.caption || `CodeClub Moment #${idx + 1}`,
            category: "Code Clash League",
            date: "Recent",
            imageUrl: item.image_url,
          }));
          setGalleryList([...formatted, ...defaultGalleryItems]);
        }
      } catch (e) {
        // Fallback to local curated events
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

  const filteredMedia =
    mediaCategory === "All"
      ? galleryList
      : galleryList.filter((item) => item.category === mediaCategory);

  const activeMedia = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? filteredMedia.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) =>
      prev === filteredMedia.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredMedia.length]);

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
          From high-intensity coding leagues to campus orientations and exhibition days.
          Explore our past event recaps, round breakdowns, and photo archives.
        </p>
      </div>

      {/* Featured Banner: Code Clash League (Flagship) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-surface via-brand-surface to-brand-border/40 border border-brand-accent/30 p-6 sm:p-8 mb-16 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-brand-accent uppercase tracking-wider bg-brand-accent/15 px-2.5 py-0.5 rounded-md border border-brand-accent/30">
                Flagship Completed
              </span>
              <span className="text-xs text-brand-muted">August 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-text mb-2">
              Code Clash League (CCL)
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-4">
              Our 3-round competitive coding championship where students battled across
              frontend design, Python code debugging, and live algorithmic problem solving.
            </p>

            {/* 3 Rounds Pill Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 rounded-xl bg-brand-bg/80 border border-brand-border flex items-center gap-2 text-xs text-brand-text">
                <Code2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Round 1: CSS Battle</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brand-bg/80 border border-brand-border flex items-center gap-2 text-xs text-brand-text">
                <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Round 2: Python Debugging</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brand-bg/80 border border-brand-border flex items-center gap-2 text-xs text-brand-text">
                <Trophy className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Round 3: Live DSA</span>
              </div>
            </div>
          </div>

          <Link
            to="/events/1"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-[#0d9668] text-brand-bg font-semibold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 cursor-pointer"
          >
            <span>View Full Recap & Media</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Events List Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold text-brand-text">All Events & Recaps</h2>
          <p className="text-xs text-brand-muted">
            Orientation Day, Club Day, Code Clash League & Upcoming Sessions
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
              { id: "completed", label: "Completed" },
              { id: "upcoming", label: "Upcoming" },
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

      {/* Events Grid */}
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
                  <Sparkles className="w-10 h-10 text-brand-accent/40 animate-pulse" />
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
                <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors mb-1 line-clamp-1">
                  {event.title}
                </h3>
                {event.tagline && (
                  <p className="text-[11px] text-brand-accent font-medium mb-2">
                    {event.tagline}
                  </p>
                )}
                <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed mb-4">
                  {event.description}
                </p>
              </div>

              <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-accent">
                <span>View Event Details & Photos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Integrated Section: Campus Moments & Event Highlights */}
      <section className="pt-10 border-t border-brand-border/60" id="media-showcase">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Event Photography & Moments</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-brand-text mb-3">
            Event Highlights Archive
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Photos captured during Code Clash League, Club Day exhibitions, and our Orientation Day launch.
          </p>
        </div>

        {/* Media Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {["All", "Code Clash League", "Club Day", "Orientation Day"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setMediaCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                mediaCategory === cat
                  ? "bg-brand-accent text-brand-bg font-semibold shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => setLightboxIndex(index)}
              className="group relative bg-brand-surface border border-brand-border hover:border-brand-accent/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/5 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-bg">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                <span className="absolute top-3 left-3 text-[11px] font-semibold text-brand-accent bg-brand-bg/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-brand-border/60">
                  {item.category}
                </span>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-bg/80 backdrop-blur-md p-1.5 rounded-md text-brand-text border border-brand-border/60">
                  <Maximize2 className="w-4 h-4 text-brand-accent" />
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-brand-text text-sm group-hover:text-brand-accent transition-colors mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-brand-muted/80 mt-3 pt-3 border-t border-brand-border/40">
                  <span>{item.date}</span>
                  <span className="text-brand-accent font-medium group-hover:underline">Click to view ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent hover:bg-brand-surface transition-all cursor-pointer z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent hover:bg-brand-surface transition-all cursor-pointer z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col rounded-2xl overflow-hidden bg-brand-surface border border-brand-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] w-full bg-black/60 flex items-center justify-center overflow-hidden">
              <img
                src={activeMedia.imageUrl}
                alt={activeMedia.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-brand-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-brand-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand-accent bg-brand-accent/10 px-2.5 py-0.5 rounded-md">
                    {activeMedia.category}
                  </span>
                  {activeMedia.date && (
                    <span className="text-xs text-brand-muted">
                      · {activeMedia.date}
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold text-brand-text">
                  {activeMedia.title}
                </h2>
                {activeMedia.description && (
                  <p className="text-xs text-brand-muted mt-0.5">
                    {activeMedia.description}
                  </p>
                )}
              </div>

              <div className="text-xs text-brand-muted shrink-0">
                {lightboxIndex + 1} of {filteredMedia.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
