import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";
import BentoTile from "../components/BentoTile";
import {
  Calendar,
  Sparkles,
  ArrowLeft,
  Camera,
  MapPin,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  AlertCircle,
} from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);

  const getBentoSpan = (index, total) => {
    if (total === 1) return "sm:col-span-2 lg:col-span-3 min-h-[380px]";
    const mod = index % 8;
    if (mod === 0) return "sm:col-span-2 sm:row-span-2 min-h-[360px]";
    if (mod === 5) return "sm:col-span-2 min-h-[260px]";
    return "col-span-1 min-h-[240px]";
  };

  // Strictly query Supabase for this event and its media
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [eventRes, mediaRes] = await Promise.all([
          supabase.from("events").select("*").eq("id", id).single(),
          supabase
            .from("event_media")
            .select("*")
            .eq("event_id", id)
            .order("sort_order", { ascending: true }),
        ]);

        if (eventRes.error) {
          setError(eventRes.error);
        } else {
          setEvent(eventRes.data);
        }

        if (!mediaRes.error && mediaRes.data) {
          setMedia(mediaRes.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const activePhoto = lightboxIndex !== null ? media[lightboxIndex] : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
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
  }, [lightboxIndex, media.length]);

  if (loading)
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center text-brand-muted">
        Loading event details from Supabase...
      </div>
    );

  if (error || !event)
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="text-red-400 font-semibold mb-2">Event Not Found</p>
        <p className="text-xs text-brand-muted mb-6">
          {error?.message || "This event could not be found in the Supabase database."}
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-bg font-semibold rounded-xl text-xs hover:bg-[#0d9668] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Hub</span>
        </Link>
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 z-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-medium text-brand-muted hover:text-brand-accent transition-colors bg-brand-surface border border-brand-border px-3.5 py-1.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Events & Media</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-brand-accent/10 text-brand-accent border border-brand-accent/30 capitalize">
          <Sparkles className="w-3 h-3" />
          <span>{event.status} Event</span>
        </div>
      </div>

      {/* Hero Header Bento Tile */}
      <div className="relative rounded-3xl overflow-hidden border border-brand-border bg-brand-surface mb-8 min-h-[320px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-10 shadow-2xl">
        {event.cover_image_url ? (
          <img
            src={event.cover_image_url}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-surface via-brand-border to-brand-bg flex items-center justify-center">
            <Sparkles className="w-24 h-24 text-brand-accent/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 text-xs text-brand-text font-mono mb-3">
            <span className="flex items-center gap-1.5 bg-brand-bg/80 backdrop-blur-md px-3 py-1 rounded-lg border border-brand-border/60">
              <Calendar className="w-3.5 h-3.5 text-brand-accent" />
              {formatDate(event.event_date)}
            </span>
            <span className="flex items-center gap-1.5 bg-brand-bg/80 backdrop-blur-md px-3 py-1 rounded-lg border border-brand-border/60">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              Integral University, Lucknow
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Bento Grid Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Bento Tile 1: The Event Story */}
        <div className="md:col-span-2 bg-brand-surface border border-brand-border hover:border-brand-accent/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                <Bookmark className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-brand-text">
                About the Event
              </h2>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              {event.description || "Official campus session organized by CodeClub IU Lucknow."}
            </p>
          </div>

          <div className="pt-4 border-t border-brand-border/50 flex items-center justify-between text-xs text-brand-muted">
            <span>Organized by CodeClub IU Lucknow</span>
            <span className="text-brand-accent font-medium">Department of CSE</span>
          </div>
        </div>

        {/* Bento Tile 2: Key Details */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-accent/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-brand-text">
                Key Details
              </h2>
            </div>

            <ul className="space-y-3 text-xs text-brand-muted">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                <span>
                  <strong className="text-brand-text">Status:</strong>{" "}
                  <span className="capitalize">{event.status}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                <span>
                  <strong className="text-brand-text">Eligibility:</strong> Open
                  to all IU Students
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                <span>
                  <strong className="text-brand-text">Campus:</strong> Integral
                  University, Kursi Road
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-brand-border/50 text-xs text-brand-accent font-semibold">
            Department of Computer Science & Engineering
          </div>
        </div>
      </div>

      {/* Bento Photo Gallery Grid (from Supabase event_media) */}
      <div className="mb-14">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-brand-accent" />
            <h2 className="text-xl font-bold text-brand-text">
              Captured Moments & Event Photos
            </h2>
          </div>
          {media.length > 0 && (
            <span className="text-xs text-brand-muted">
              Click any photo to expand
            </span>
          )}
        </div>

        {media.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px]">
              {media.slice(0, visibleCount).map((item, i) => (
                <BentoTile
                  key={item.id || i}
                  imageUrl={item.image_url}
                  alt={item.caption || event.title}
                  caption={item.caption}
                  span={getBentoSpan(i, media.length)}
                  onSelect={() => setLightboxIndex(i)}
                />
              ))}
            </div>

            {visibleCount < media.length && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) => Math.min(prev + 24, media.length))
                  }
                  className="px-6 py-3 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent text-xs font-semibold text-brand-text hover:text-brand-accent transition-all cursor-pointer shadow-lg hover:shadow-brand-accent/5"
                >
                  Load More Photos ({media.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-brand-surface border border-brand-border text-center text-xs text-brand-muted">
            No photos uploaded for this event in Supabase yet.
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-brand-muted hover:text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {media.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-brand-surface/80 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50 shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-brand-surface/80 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50 shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col rounded-3xl overflow-hidden bg-brand-surface border border-brand-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[68vh] w-full bg-black/70 flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.image_url}
                alt={activePhoto.caption || event.title}
                className="max-h-[68vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-brand-surface flex items-center justify-between gap-4 border-t border-brand-border">
              <div>
                <p className="text-xs text-brand-accent font-semibold mb-0.5">
                  {event.title}
                </p>
                <p className="text-sm font-bold text-brand-text">
                  {activePhoto.caption || "Event Moment"}
                </p>
              </div>

              <div className="text-xs text-brand-muted font-mono shrink-0">
                {lightboxIndex + 1} / {media.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
