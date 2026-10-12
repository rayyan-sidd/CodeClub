import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";
import { Camera, ArrowRight } from "lucide-react";

export default function GalleryMarquee() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real media directly from Supabase
  useEffect(() => {
    async function fetchGalleryMedia() {
      try {
        const { data, error } = await supabase
          .from("event_media")
          .select("id, image_url, caption, event_id, events(title)")
          .order("sort_order", { ascending: true })
          .limit(20);

        if (!error && data && data.length > 0) {
          setItems(
            data.map((m) => ({
              id: m.id,
              imageUrl: m.image_url,
              title: m.caption || m.events?.title || "CodeClub Event",
              eventId: m.event_id,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load gallery items from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGalleryMedia();
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden z-10 py-12">
        <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">
          Behind the Code
        </h2>
        <div className="flex gap-4 justify-center px-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-48 md:h-56 w-64 md:w-72 rounded-2xl bg-brand-surface/60 border border-brand-border animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return null;
  }

  // Triple items for continuous seamless marquee animation
  const tripled = [...items, ...items, ...items];

  return (
    <section className="overflow-hidden z-10 py-12" aria-label="Campus event highlights">
      <div className="text-center max-w-2xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Campus Moments</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-text tracking-tight mb-2">
          Behind the Code
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted">
          Real moments from our hackathons, workshops, and competitive coding leagues.
        </p>
      </div>

      <div className="flex gap-4 marquee-track w-max py-2">
        {tripled.map((item, index) => (
          <Link
            to={item.eventId ? `/events/${item.eventId}` : "/events"}
            key={`${item.id}-${index}`}
            className="relative rounded-2xl overflow-hidden h-48 md:h-56 w-64 md:w-72 shrink-0 group border border-brand-border/60 hover:border-brand-accent/60 bg-brand-surface transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent/10 hover:-translate-y-1 block"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity flex items-end p-4">
              <p className="text-xs font-semibold text-brand-text line-clamp-2 group-hover:text-brand-accent transition-colors">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:scale-105"
        >
          <span>Explore All Event Recaps & Photos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
