import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";
import BentoTile from "../components/BentoTile";
import { events as mockEvents } from "../data/mockEvents.js";
import { galleryItems } from "../data/mockgallery.js";

function getSpanPattern(count) {
  if (count === 1) return ["col-span-2 md:col-span-4 row-span-2"];
  if (count === 2) return ["col-span-2 row-span-2", "col-span-2 row-span-2"];
  if (count === 3)
    return [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
    ];
  if (count === 4)
    return [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1",
    ];
  const base = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
  ];
  return Array.from({ length: count }, (_, i) => base[i % base.length]);
}

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [eventRes, mediaRes] = await Promise.all([
          supabase.from("events").select("*").eq("id", id).single(),
          supabase
            .from("event_media")
            .select("*")
            .eq("event_id", id)
            .order("sort_order", { ascending: true }),
        ]);

        if (eventRes.error || !eventRes.data) {
          // Gracefully fallback to mock event
          const fallback = mockEvents.find((e) => String(e.id) === String(id));
          if (fallback) {
            setEvent(fallback);
            const fallbackMedia = galleryItems.map((g, i) => ({
              id: `mock-${i}`,
              image_url: g.imageUrl,
              caption: g.title,
            }));
            setMedia(fallbackMedia);
            setError(null);
          } else {
            setError(eventRes.error || new Error("Event not found"));
          }
        } else {
          setEvent(eventRes.data);
          setMedia(mediaRes.data || []);
        }
      } catch (err) {
        const fallback = mockEvents.find((e) => String(e.id) === String(id));
        if (fallback) {
          setEvent(fallback);
          setMedia(
            galleryItems.map((g, i) => ({
              id: `mock-${i}`,
              image_url: g.imageUrl,
              caption: g.title,
            }))
          );
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (loading)
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-zinc-400">
        Loading...
      </div>
    );
  if (error || !event)
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-red-400">Couldn't load this event.</p>
        <Link
          to="/events"
          className="text-emerald-400 text-sm hover:underline mt-2 inline-block"
        >
          ← Back to Events
        </Link>
      </div>
    );

  const spans = getSpanPattern(media.length);

  return (
    <div>
      <div className="relative w-full h-[45vh] min-h-[320px] z-10">
        {event.cover_image_url ? (
          <img
            src={event.cover_image_url}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-5xl mx-auto px-6 pb-8 w-full">
          <Link
            to="/events"
            className="text-zinc-300 hover:text-emerald-400 text-sm mb-4 inline-block"
          >
            ← Back to Events
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
          <p className="text-zinc-300">{formatDate(event.event_date)}</p>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-12">
        {event.description && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 mb-10 max-w-3xl z-10">
            <p className="text-zinc-300 z-10">{event.description}</p>
          </div>
        )}

        {media.length > 0 ? (
          <div
            className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] gap-3 z-10"
            style={{ perspective: "800px" }}
          >
            {media.map((item, i) => (
              <BentoTile
                key={item.id}
                imageUrl={item.image_url}
                alt={item.caption || event.title}
                span={spans[i]}
                delay={i * 50}
              />
            ))}
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">
            No photos added for this event yet.
          </p>
        )}
      </section>
    </div>
  );
}
