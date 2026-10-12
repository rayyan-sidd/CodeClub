import { Compass, Sparkles, MapPin, CheckCircle2, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 z-10" aria-label="About CodeClub">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student Community</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-3">
          About CodeClub
        </h2>
        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
          The official tech heartbeat of Integral University, bridging academic theory with real engineering craft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Who We Are */}
        <div className="glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-text">Who We Are</h3>
              <p className="text-[11px] text-brand-accent font-mono">Department of Computer Science & Engineering</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
            CodeClub is a student-led developer ecosystem created to bring together coders, designers, 
            and problem-solvers across Integral University. We replace passive lectures with hands-on building, 
            active hackathon teams, and competitive coding leagues.
          </p>

          <ul className="space-y-2.5 text-xs text-zinc-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Inclusive to all skill levels from first-years to seniors</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Mentored directly by faculty advisors Ms. Zainab Khan & Ms. Yusra Beg</span>
            </li>
          </ul>
        </div>

        {/* Card 2: What We're About */}
        <div className="glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-brand-text">Our Mission</h3>
              <p className="text-[11px] text-teal-400 font-mono">Real-World Competence & Excellence</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
            We empower students to write clean code, master Data Structures & Algorithms, contribute to 
            open-source software, and confidently tackle technical hiring rounds and competitive hackathons.
          </p>

          <ul className="space-y-2.5 text-xs text-zinc-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Curated competitive tournaments (CSS Battle, Debugging, DSA)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
              <span>Daily Practice Arena with automatic in-browser judge</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Campus Location Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
          <span>Integral University Campus · Dasauli, Kursi Road, Lucknow, Uttar Pradesh 226026</span>
        </div>
        <span className="font-mono text-[11px] text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
          Faculty of Engineering & Technology
        </span>
      </div>
    </section>
  );
}
