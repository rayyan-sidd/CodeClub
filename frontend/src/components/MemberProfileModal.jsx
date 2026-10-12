import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Share2,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function getInitials(name) {
  return name
    .replace(/^(Ms\.|Mr\.|Dr\.)\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MemberProfileModal({
  member,
  onClose,
  onPrev,
  onNext,
  hasNav = true,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!member) return null;

  const handleShare = (e) => {
    e.stopPropagation();
    const shareText = `${member.name} (${member.role}) · CodeClub Integral University Lucknow\n${member.bio}\nGitHub: ${member.github || "N/A"}\nLinkedIn: ${member.linkedin || "N/A"}`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Navigation Arrows (Prev / Next) */}
      {hasNav && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="hidden md:flex fixed left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white p-3.5 rounded-full bg-brand-surface/90 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-[10002] hover:scale-110 shadow-2xl"
            aria-label="Previous member"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="hidden md:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white p-3.5 rounded-full bg-brand-surface/90 border border-brand-border hover:border-brand-accent transition-all cursor-pointer z-[10002] hover:scale-110 shadow-2xl"
            aria-label="Next member"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Discord Style Profile Popout Container */}
      <div
        className="relative w-full max-w-lg bg-[#0F1923] rounded-3xl border border-brand-border/80 shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col z-[10000] shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* UNCLIPPED TOP HEADER: Banner + Avatar & Socials + Name */}
        <div className="relative shrink-0">
          {/* Banner Area */}
          <div
            className={`h-28 sm:h-32 w-full bg-gradient-to-r ${
              member.bannerGradient || "from-emerald-700 via-teal-900 to-slate-900"
            } relative p-4 flex items-start justify-between z-10`}
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/50 text-brand-accent border border-white/10 backdrop-blur-md">
                CodeClub Profile
              </span>
            </div>

            <div className="flex items-center gap-2 z-20">
              {/* Share / Copy Info Button */}
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer shadow-md"
                title="Copy Profile Card"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-brand-accent" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer shadow-md"
                aria-label="Close profile"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Overlapping Avatar & Socials Row (Strictly above banner, z-30) */}
          <div className="px-6 relative flex items-end justify-between -mt-12 sm:-mt-14 mb-3 z-30">
            {/* Avatar */}
            <div className="relative z-30">
              {member.image ? (
                <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full p-1 bg-[#0F1923] shadow-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-2 border-brand-accent shadow-md"
                  />
                </div>
              ) : (
                <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full p-1 bg-[#0F1923] shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-brand-surface to-brand-border border-2 border-brand-accent flex items-center justify-center text-brand-accent font-bold text-2xl">
                    {getInitials(member.name)}
                  </div>
                </div>
              )}

              {/* Status Indicator */}
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#0F1923] shadow-sm z-40" />
            </div>

            {/* Quick Social Buttons in Header */}
            <div className="flex items-center gap-2 mb-1 z-30">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-brand-surface hover:bg-brand-surface/80 text-brand-muted hover:text-brand-accent border border-brand-border hover:border-brand-accent/50 transition-all cursor-pointer shadow-md"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-brand-surface hover:bg-brand-surface/80 text-brand-muted hover:text-brand-accent border border-brand-border hover:border-brand-accent/50 transition-all cursor-pointer shadow-md"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Name & Handle */}
          <div className="px-6 mb-3 z-20">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>{member.name}</span>
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-mono text-brand-accent">
                {member.handle || `@${member.name.toLowerCase().replace(/\s+/g, ".")}`}
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-brand-muted">{member.role}</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE BODY DETAILS: Bio, Badges, Tech Stack */}
        <div className="px-6 pb-6 overflow-y-auto flex-1 flex flex-col space-y-3.5">
          {/* Custom Status Pill (Discord style) */}
          {member.customStatus && (
            <div className="p-2.5 sm:p-3 rounded-2xl bg-brand-surface/60 border border-brand-border/70 text-xs text-zinc-300 font-sans flex items-center gap-2 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent shrink-0" />
              <span>{member.customStatus}</span>
            </div>
          )}

          {/* Discord Profile Inner Box */}
          <div className="p-4 rounded-2xl bg-black/40 border border-brand-border/60 space-y-4 text-xs">
            {/* About Me */}
            <div>
              <h3 className="text-[10px] font-bold text-brand-muted uppercase tracking-wider font-mono mb-1.5">
                About Me
              </h3>
              <p className="text-zinc-300 leading-relaxed text-xs">
                {member.bio ||
                  `${member.name} is a vital member of CodeClub Integral University Lucknow, contributing to ${member.department}.`}
              </p>
            </div>

            {/* Department */}
            <div className="pt-3 border-t border-brand-border/40">
              <h3 className="text-[10px] font-bold text-brand-muted uppercase tracking-wider font-mono mb-1">
                Department & Campus
              </h3>
              <p className="text-brand-text font-medium text-xs">
                {member.department}
              </p>
              <p className="text-brand-muted text-[11px]">
                Integral University, Lucknow
              </p>
            </div>

            {/* Discord Badges / Roles */}
            {member.badges && member.badges.length > 0 && (
              <div className="pt-3 border-t border-brand-border/40">
                <h3 className="text-[10px] font-bold text-brand-muted uppercase tracking-wider font-mono mb-2">
                  Roles & Badges
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {member.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-brand-surface border border-brand-border/80 text-brand-accent flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills & Tech Stack */}
            {member.skills && member.skills.length > 0 && (
              <div className="pt-3 border-t border-brand-border/40">
                <h3 className="text-[10px] font-bold text-brand-muted uppercase tracking-wider font-mono mb-2">
                  Tech Stack & Domains
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-brand-bg border border-brand-border/60 text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Copyable Share Notice */}
          <div className="mt-3.5 pt-2 flex items-center justify-between text-[11px] text-brand-muted shrink-0">
            <span>Press Esc to close · Arrow keys ← → to browse</span>
            {copied && (
              <span className="text-brand-accent font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Copied to clipboard!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
