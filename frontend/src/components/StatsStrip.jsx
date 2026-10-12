import { Users, Trophy, Code2, GitBranch } from "lucide-react";

const statIcons = [Users, Trophy, Code2, GitBranch];

export default function StatsStrip({ stats = [] }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 z-10 my-8">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-border/80 shadow-2xl backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-brand-border/60">
          {stats.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <div
                key={stat.label || index}
                className={`flex flex-col items-center justify-center text-center group ${
                  index > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-3 group-hover:scale-110 group-hover:bg-brand-accent/20 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-mono tracking-tight mb-1">
                  {stat.value}
                </p>
                <h3 className="text-xs sm:text-sm font-semibold text-brand-text mb-0.5">
                  {stat.label}
                </h3>
                <span className="text-[10px] text-brand-muted font-mono">
                  Integral University, Lucknow
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}