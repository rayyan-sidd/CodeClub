import { Maximize2, Sparkles } from "lucide-react";

export default function BentoTile({
  imageUrl,
  alt,
  caption,
  span = "col-span-1 row-span-1",
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative rounded-2xl overflow-hidden border border-brand-border hover:border-brand-accent/60 bg-brand-surface/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-accent/10 cursor-pointer text-left w-full h-full min-h-[180px] ${span}`}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={alt || "Event media"}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/95 via-brand-bg/30 to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

      {/* Top Right Expand Icon Badge */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 bg-brand-bg/85 backdrop-blur-md p-2 rounded-xl text-brand-accent border border-brand-border/80 shadow-md">
        <Maximize2 className="w-4 h-4" />
      </div>

      {/* Bottom Caption Pill */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-md line-clamp-2 group-hover:text-brand-accent transition-colors">
            {caption}
          </p>
        </div>
      )}
    </button>
  );
}
