import { Link } from "react-router-dom";
import CodeClubLogo from "./CodeClubLogo";
import {
  Mail,
  MapPin,
  ArrowUp,
  Heart,
  Code2,
  ExternalLink,
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

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-brand-surface/90 border-t border-brand-border mt-20 relative z-10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <CodeClubLogo className="h-10 w-auto shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-brand-text">
                  Code<span className="text-brand-accent">Club</span>
                </span>
                <span className="text-xs text-brand-muted">IU Lucknow</span>
              </div>
            </Link>
            <p className="text-sm text-brand-muted leading-relaxed">
              The premier student-led developer hub at Integral University. Empowering
              engineers, designers, and innovators to code and build the future.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-muted">
              <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" />
              <span>Integral University, Kursi Rd, Lucknow, UP</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-text mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link to="/" className="hover:text-brand-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-brand-accent transition-colors">
                  Events & Media Hub
                </Link>
              </li>
              <li>
                <Link to="/practice" className="hover:text-brand-accent transition-colors">
                  Practice Arena (POTD)
                </Link>
              </li>
              <li>
                <Link to="/learning" className="hover:text-brand-accent transition-colors">
                  Learning Roadmap
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-brand-accent transition-colors">
                  Core Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-accent transition-colors">
                  Contact & Join
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-text mb-4">
              Initiatives
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                Web & Mobile Development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                AI & Machine Learning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                Competitive Programming & DSA
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                Open Source & Git
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                Annual Hackathons & Sprints
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-text mb-4">
              Connect With Us
            </h4>
            <p className="text-sm text-brand-muted">
              Join our channels for real-time announcements, mentorship, and event tickets.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/rayyan-sidd/CodeClub"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-stats-bg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent/50 transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-stats-bg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent/50 transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-brand-stats-bg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent/50 transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="w-9 h-9 rounded-lg bg-brand-stats-bg border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent/50 transition-all hover:scale-105"
                aria-label="Contact Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-medium text-brand-accent hover:underline pt-2"
            >
              <span>Have a question? Reach out to us</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} CodeClub Integral University. Built with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 mx-0.5 inline" />
            <span>by student engineers.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Live</span>
            </span>

            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-brand-border hover:border-brand-accent/50 hover:text-brand-accent transition-all cursor-pointer bg-brand-surface text-brand-muted hover:scale-105"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
