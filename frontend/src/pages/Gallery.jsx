import { useState, useEffect } from "react";
import { galleryItems as defaultGalleryItems } from "../data/mockgallery";
import { supabase } from "../lib/supabaseClient";
import {
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Calendar,
  Sparkles,
} from "lucide-react";

const CATEGORIES = ["All", "Hackathons", "Workshops", "Competitions", "Meetups"];

export default function Gallery() {
  const [items, setItems] = useState(defaultGalleryItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Optional sync with Supabase event_media
  useEffect(() => {
    async function fetchMedia() {
      try {
        const { data, error } = await supabase
          .from("event_media")
          .select("id, image_url, caption, sort_order, created_at")
          .order("sort_order", { ascending: true });

        if (!error && data && data.length > 0) {
          const supabaseItems = data.map((item, idx) => ({
            id: item.id || `sb-${idx}`,
            title: item.caption || `CodeClub Moment #${idx + 1}`,
            category: "Hackathons",
            date: item.created_at ? new Date(item.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Recent",
            description: "CodeClub event highlight from campus archives.",
            imageUrl: item.image_url,
          }));
          // Merge Supabase items with defaults
          setItems([...supabaseItems, ...defaultGalleryItems]);
        }
      } catch (e) {
        console.warn("Using offline gallery items", e);
      }
    }
    fetchMedia();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : prev + 1
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
  }, [lightboxIndex, filteredItems.length]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Life at CodeClub IU Lucknow</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
          Moments & Memories
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          From late-night hackathon sprints to packed lecture halls during workshops—see
          how our developer community learns, builds, and grows together.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setLightboxIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-brand-accent text-brand-bg font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-brand-surface/50 border border-brand-border rounded-2xl p-12 text-center max-w-md mx-auto">
          <ImageIcon className="w-12 h-12 text-brand-muted mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-semibold text-brand-text mb-1">No photos in this category yet</h3>
          <p className="text-xs text-brand-muted">Check back soon or select "All" to browse all moments.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Pill */}
                <span className="absolute top-3 left-3 text-[11px] font-semibold text-brand-accent bg-brand-bg/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-brand-border/60">
                  {item.category || "Moment"}
                </span>

                {/* Expand hover button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-bg/80 backdrop-blur-md p-1.5 rounded-md text-brand-text border border-brand-border/60">
                  <Maximize2 className="w-4 h-4 text-brand-accent" />
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-brand-text text-base group-hover:text-brand-accent transition-colors mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.date && (
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-muted/80 mt-3 pt-3 border-t border-brand-border/40">
                    <Calendar className="w-3 h-3 text-brand-accent" />
                    <span>{item.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-brand-muted hover:text-white p-2 rounded-full bg-brand-surface/60 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-50"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent hover:bg-brand-surface transition-all cursor-pointer z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2.5 rounded-full bg-brand-surface/70 border border-brand-border hover:border-brand-accent hover:bg-brand-surface transition-all cursor-pointer z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Detail Box */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col rounded-2xl overflow-hidden bg-brand-surface border border-brand-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] w-full bg-black/60 flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-brand-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-brand-border">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand-accent bg-brand-accent/10 px-2.5 py-0.5 rounded-md">
                    {activeItem.category}
                  </span>
                  {activeItem.date && (
                    <span className="text-xs text-brand-muted">
                      · {activeItem.date}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-brand-text">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="text-xs text-brand-muted mt-0.5">
                    {activeItem.description}
                  </p>
                )}
              </div>

              <div className="text-xs text-brand-muted shrink-0">
                {lightboxIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
