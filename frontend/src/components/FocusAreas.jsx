import { Link } from "react-router-dom";
import {
  Trophy,
  Code2,
  Cpu,
  GitPullRequest,
  ArrowRight,
  Sparkles,
  Flame,
  Layers,
} from "lucide-react";

export default function FocusAreas() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 z-10" aria-label="Club Focus Areas">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Pillars</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-3">
          What We Build & Learn
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          From intensive 3-round competitive leagues to fullstack web engineering and open-source contributions.
        </p>
      </div>

      {/* Modern Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bento Card 1: Competitive Hackathons & Leagues (Wide 2-col) */}
        <div className="md:col-span-2 glass-panel-glow rounded-3xl p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-accent/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-2.5 py-1 rounded-full">
                Tournament Tested
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2.5 group-hover:text-brand-accent transition-colors">
              Competitive Coding & Campus Leagues
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-xl mb-6">
              Test your logic under time constraints in curated tournaments like our signature 
              <strong className="text-brand-text"> Code Clash League</strong> across CSS Battle, Python Debugging, and Live algorithmic DSA face-offs.
            </p>

            {/* Micro-pills representing the 3 rounds */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Round 1: CSS Battle
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Round 2: Python Debugging
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Round 3: Live DSA Showdown
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
            <Link
              to="/events"
              className="text-xs font-semibold text-brand-accent hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Tournaments & Photos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[11px] text-brand-muted font-mono">3 Events Completed</span>
          </div>
        </div>

        {/* Bento Card 2: Daily Practice Arena (1-col) */}
        <div className="glass-panel-glow rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full animate-pulse">
                Live Now
              </span>
            </div>

            <h3 className="text-xl font-bold text-brand-text mb-2.5 group-hover:text-amber-400 transition-colors">
              Daily Practice Arena
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed mb-6">
              A built-in in-browser code editor with automatic test case runners, hint systems, and web sandbox. Practice daily to maintain your campus streak!
            </p>

            <div className="p-3.5 rounded-2xl bg-brand-surface/80 border border-brand-border/80 font-mono text-[11px] text-zinc-300 mb-6 space-y-1">
              <div className="text-zinc-500">// Problem of the Day</div>
              <div className="text-brand-accent font-semibold">Two Sum · DSA Track</div>
              <div className="text-zinc-400">Score: +50 Points · Easy</div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border/60">
            <Link
              to="/practice"
              className="text-xs font-semibold text-brand-accent hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Launch Editor & Solve</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bento Card 3: Fullstack & Systems Engineering (1-col) */}
        <div className="glass-panel-glow rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                Engineering
              </span>
            </div>

            <h3 className="text-xl font-bold text-brand-text mb-2.5 group-hover:text-blue-400 transition-colors">
              Fullstack & Cloud Labs
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed mb-6">
              Go beyond syntax. Architect real web apps, APIs, Supabase databases, and responsive UIs with modern tech stacks.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {["React 19", "Tailwind", "Supabase", "Node.js", "Vite", "TypeScript"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-brand-surface border border-brand-border text-brand-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border/60">
            <Link
              to="/learning"
              className="text-xs font-semibold text-brand-accent hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Roadmaps</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bento Card 4: Open Source & Mentorship (Wide 2-col) */}
        <div className="md:col-span-2 glass-panel-glow rounded-3xl p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <GitPullRequest className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-full">
                Community Driven
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2.5 group-hover:text-teal-400 transition-colors">
              Open Source & Peer Mentorship
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-xl mb-6">
              Master the Git workflow, collaborate on club repositories, and receive guidance from faculty advisors and senior student coordinators to prepare for tech careers.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300">
                #FacultyMentored
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300">
                #PeerCodeReviews
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300">
                #GitWorkflow
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-xl bg-brand-surface border border-brand-border text-zinc-300">
                #IntegralCSE
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
            <Link
              to="/team"
              className="text-xs font-semibold text-brand-accent hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Meet Coordinators & Advisors</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-[11px] text-brand-muted font-mono">CSE Department</span>
          </div>
        </div>
      </div>
    </section>
  );
}
