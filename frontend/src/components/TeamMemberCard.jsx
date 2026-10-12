function getInitials(name) {
  return name
    .replace(/^(Ms\.|Mr\.|Dr\.)\s+/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function GithubIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function TeamMemberCard({
  name,
  role,
  department,
  photo,
  featured,
  github,
  linkedin,
  onClick,
}) {
  const avatarSize = featured ? "w-24 h-24 text-xl" : "w-20 h-20 text-base";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className={`group relative glass-panel-glow rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-between z-10 cursor-pointer ${
        featured ? "border-brand-accent/30 shadow-[0_0_25px_rgba(16,185,129,0.08)]" : ""
      }`}
    >
      <div className="w-full flex flex-col items-center">
        {photo ? (
          <div className="relative mb-4">
            <div className="rounded-full p-1 bg-gradient-to-tr from-brand-accent/40 via-brand-border to-brand-accent/10 group-hover:from-brand-accent group-hover:to-teal-400 transition-all duration-500 shadow-md">
              <img
                src={photo}
                alt={name}
                className={`rounded-full object-cover transition-transform duration-500 group-hover:scale-105 ${avatarSize}`}
              />
            </div>
            {featured && (
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-brand-accent border-2 border-brand-surface shadow-sm" />
            )}
          </div>
        ) : (
          <div
            className={`rounded-full bg-gradient-to-tr from-brand-surface via-brand-border to-brand-surface border-2 border-brand-accent/30 text-brand-accent font-bold flex items-center justify-center mb-4 group-hover:border-brand-accent transition-all duration-300 shadow-md ${avatarSize}`}
          >
            {getInitials(name)}
          </div>
        )}

        <h3 className="text-base font-bold text-brand-text group-hover:text-brand-accent transition-colors">
          {name}
        </h3>

        <div className="mt-1 mb-1.5">
          <span className="text-[11px] font-mono font-medium text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2.5 py-0.5 rounded-full inline-block">
            {role}
          </span>
        </div>

        {department && (
          <p className="text-[11px] text-brand-muted leading-tight">
            {department}
          </p>
        )}

        <span className="text-[10px] text-brand-muted/70 group-hover:text-brand-accent transition-colors mt-2">
          Click to view profile ↗
        </span>
      </div>

      {/* Social Links Row */}
      {(github || linkedin) && (
        <div 
          className="flex items-center gap-2 mt-3 pt-3 border-t border-brand-border/60 w-full justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl text-brand-muted hover:text-brand-accent hover:bg-brand-surface border border-transparent hover:border-brand-border transition-all cursor-pointer"
              aria-label={`${name}'s GitHub`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl text-brand-muted hover:text-brand-accent hover:bg-brand-surface border border-transparent hover:border-brand-border transition-all cursor-pointer"
              aria-label={`${name}'s LinkedIn`}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
