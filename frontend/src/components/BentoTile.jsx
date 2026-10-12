import { useInViewport } from "../hooks/useInViewport";

export default function BentoTile({ imageUrl, alt, span, delay, onSelect }) {
  const [ref, inView] = useInViewport();

  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `scale(1.03) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  };
  const reset = (e) =>
    (e.currentTarget.style.transform = "scale(1) rotateX(0) rotateY(0)");

  return (
    <button
      ref={ref}
      onClick={onSelect}
      onMouseMove={tilt}
      onMouseLeave={reset}
      style={{
        transitionDelay: inView ? `${delay}ms` : "0ms",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-xl overflow-hidden border border-zinc-800 transition-all duration-500 ease-out will-change-transform z-10 ${span} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    </button>
  );
}
