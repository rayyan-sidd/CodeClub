import useTypewriter from "../hooks/useTypewriter.jsx";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

export default function Hero({ nextEvent }) {
  const typewriterText = [
    "Developers.",
    "Engineers.",
    "Creators.",
    "Innovators.",
    "Problem Solvers.",
    "Leaders.",
  ];

  const typedText = useTypewriter(typewriterText, 100, 1500);

  return (
    <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-24 pb-12">
      {nextEvent ? (
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-accent bg-brand-accent/10 border border-brand-accent/20 hover:border-brand-accent/50 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          <span>Next Event:</span>
          <span className="font-semibold text-white">{nextEvent.title}</span>
          <span className="text-brand-muted">·</span>
          <span>
            {new Date(nextEvent.event_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <ArrowRight className="w-3 h-3 text-brand-accent" />
        </Link>
      ) : (
        <div className="inline-flex items-center gap-2 text-xs text-brand-muted bg-brand-surface/60 border border-brand-border rounded-full px-3 py-1 mb-6">
          <Terminal className="w-3.5 h-3.5 text-brand-accent" />
          <span>Integral University · Lucknow</span>
        </div>
      )}

      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-brand-text tracking-tight mb-5 leading-tight">
        Build the Future with <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-500">
          CodeClub
        </span>
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl font-mono text-brand-muted mb-6">
        We turn students into{" "}
        <span className="text-brand-accent font-semibold">{typedText}</span>
        <span className="animate-pulse text-brand-accent font-bold">|</span>
      </p>

      <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
        The official student tech community at Integral University. Collaborate on
        real-world projects, level up in competitive hackathons, and master modern
        software development.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <Link
          to="/events"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer"
        >
          Explore Events
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 font-semibold text-brand-text bg-brand-surface/70 hover:bg-brand-surface border border-brand-border hover:border-brand-accent/50 rounded-xl transition-all cursor-pointer backdrop-blur-sm"
        >
          Join Community
        </Link>
      </div>
    </div>
  );
}