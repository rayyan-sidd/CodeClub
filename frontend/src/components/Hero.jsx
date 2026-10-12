import { useState } from "react";
import useTypewriter from "../hooks/useTypewriter.jsx";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Code2,
  Copy,
  Check,
  Flame,
  Play,
} from "lucide-react";

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

  const [activeTab, setActiveTab] = useState("terminal");
  const [copied, setCopied] = useState(false);

  const commandText = "npx codeclub-iu --init";

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pt-4 sm:pt-6 pb-14">
      {/* Top Tagline Pill */}
      {nextEvent ? (
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-brand-accent bg-brand-accent/10 border border-brand-accent/30 hover:border-brand-accent/60 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md transition-all hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
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
        <div className="inline-flex items-center gap-2 text-xs text-brand-text bg-brand-surface/80 border border-brand-border/80 hover:border-brand-accent/40 rounded-full px-3.5 py-1.5 mb-6 backdrop-blur-md shadow-sm transition-colors">
          <Terminal className="w-3.5 h-3.5 text-brand-accent" />
          <span className="text-brand-muted">Integral University ·</span>
          <span className="font-medium text-brand-accent">Lucknow</span>
        </div>
      )}

      {/* Main Gradient Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-brand-text tracking-tight mb-5 leading-[1.1]">
        Build the Future with <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 drop-shadow-[0_0_35px_rgba(16,185,129,0.25)]">
          CodeClub
        </span>
      </h1>

      {/* Typewriter Subtitle */}
      <p className="text-lg sm:text-xl md:text-2xl font-mono text-brand-muted mb-6">
        We turn students into{" "}
        <span className="text-brand-accent font-semibold">{typedText}</span>
        <span className="animate-pulse text-brand-accent font-bold">|</span>
      </p>

      {/* Supporting Text */}
      <p className="text-sm sm:text-base text-brand-muted max-w-2xl mx-auto mb-9 leading-relaxed">
        The official student developer community at Integral University. Collaborate on
        real-world projects, level up in competitive hackathons, and practice algorithmic challenges daily.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-14">
        <Link
          to="/practice"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer hover:scale-[1.02]"
        >
          <Flame className="w-4 h-4" />
          <span>Daily Practice Arena</span>
        </Link>

        <Link
          to="/events"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-brand-text bg-brand-surface/80 hover:bg-brand-surface border border-brand-border hover:border-brand-accent/50 rounded-xl transition-all cursor-pointer backdrop-blur-md hover:scale-[1.02]"
        >
          <span>Explore Events & Media</span>
          <ArrowRight className="w-4 h-4 text-brand-accent" />
        </Link>

        <Link
          to="/team"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-brand-muted hover:text-brand-text bg-transparent hover:bg-brand-surface/40 border border-transparent hover:border-brand-border rounded-xl transition-all cursor-pointer"
        >
          <span>Meet the Team</span>
        </Link>
      </div>

      {/* Interactive Developer Terminal Window */}
      <div className="w-full max-w-3xl mx-auto rounded-2xl glass-panel shadow-2xl border border-brand-border/80 overflow-hidden text-left font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="bg-brand-surface/90 px-4 py-3 flex items-center justify-between border-b border-brand-border/80">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs text-brand-muted font-mono hidden sm:inline">
              codeclub@iul: ~ (v2.6)
            </span>
          </div>

          {/* Terminal Tabs */}
          <div className="flex items-center gap-1 bg-brand-bg/70 p-1 rounded-lg border border-brand-border/60">
            <button
              onClick={() => setActiveTab("terminal")}
              className={`px-2.5 py-1 rounded text-[11px] font-sans transition-all cursor-pointer ${
                activeTab === "terminal"
                  ? "bg-brand-accent/20 text-brand-accent font-semibold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              bash
            </button>
            <button
              onClick={() => setActiveTab("python")}
              className={`px-2.5 py-1 rounded text-[11px] font-sans transition-all cursor-pointer ${
                activeTab === "python"
                  ? "bg-brand-accent/20 text-brand-accent font-semibold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              main.py
            </button>
            <button
              onClick={() => setActiveTab("dsa")}
              className={`px-2.5 py-1 rounded text-[11px] font-sans transition-all cursor-pointer ${
                activeTab === "dsa"
                  ? "bg-brand-accent/20 text-brand-accent font-semibold"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              potd.js
            </button>
          </div>

          {/* Copy Command Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[11px] text-brand-muted hover:text-brand-accent transition-colors bg-brand-bg/60 border border-brand-border/70 hover:border-brand-accent/50 px-2.5 py-1 rounded-md cursor-pointer"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-brand-accent" />
                <span className="text-brand-accent font-sans">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="font-sans hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-6 bg-brand-bg/95 leading-relaxed overflow-x-auto min-h-[160px]">
          {activeTab === "terminal" && (
            <div className="space-y-2">
              <p className="text-brand-muted flex items-center gap-2">
                <span className="text-brand-accent">❯</span>
                <span className="text-brand-text">{commandText}</span>
              </p>
              <p className="text-emerald-400">
                ✔ Connecting to Integral University Developer Network...
              </p>
              <p className="text-brand-muted">
                [OK] Campus: <span className="text-white">Integral University, Lucknow</span>
              </p>
              <p className="text-brand-muted">
                [OK] 3 Completed Contests:{" "}
                <span className="text-white">Orientation'26</span>,{" "}
                <span className="text-white">Club Day</span>,{" "}
                <span className="text-brand-accent">Code Clash League (3 Rounds)</span>
              </p>
              <p className="text-brand-muted">
                [OK] Live Daily Practice Arena:{" "}
                <span className="text-emerald-400">Online & Ready</span>
              </p>
              <div className="pt-2 flex items-center gap-2">
                <span className="text-brand-accent">❯</span>
                <span className="w-2 h-4 bg-brand-accent inline-block animate-pulse" />
              </div>
            </div>
          )}

          {activeTab === "python" && (
            <div className="space-y-1 font-mono text-xs">
              <p className="text-zinc-500"># Integral University CodeClub - Campus Tech Pipeline</p>
              <p>
                <span className="text-purple-400">def</span>{" "}
                <span className="text-blue-400">join_codeclub</span>
                <span className="text-zinc-300">(student, branch=</span>
                <span className="text-emerald-400">"CSE"</span>
                <span className="text-zinc-300">):</span>
              </p>
              <p className="pl-4 text-zinc-300">
                skills = [<span className="text-emerald-400">"DSA"</span>,{" "}
                <span className="text-emerald-400">"Fullstack"</span>,{" "}
                <span className="text-emerald-400">"Competitive Coding"</span>]
              </p>
              <p className="pl-4 text-purple-400">
                return{" "}
                <span className="text-yellow-300">f</span>
                <span className="text-emerald-400">"Welcome {"{student}"}! Ready to build & compete."</span>
              </p>
              <div className="pt-3">
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-accent hover:underline font-sans"
                >
                  <Play className="w-3 h-3" />
                  <span>Run and edit live in Practice Arena →</span>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "dsa" && (
            <div className="space-y-1 font-mono text-xs">
              <p className="text-zinc-500">// Problem of the Day: Two Sum · Target Search</p>
              <p>
                <span className="text-purple-400">function</span>{" "}
                <span className="text-blue-400">twoSum</span>
                <span className="text-zinc-300">(nums, target) &#123;</span>
              </p>
              <p className="pl-4 text-zinc-300">
                <span className="text-purple-400">const</span> map ={" "}
                <span className="text-purple-400">new</span>{" "}
                <span className="text-yellow-400">Map</span>();
              </p>
              <p className="pl-4 text-zinc-300">
                <span className="text-purple-400">for</span> (
                <span className="text-purple-400">let</span> i = 0; i &lt; nums.length; i++) &#123;
              </p>
              <p className="pl-8 text-zinc-300">
                <span className="text-purple-400">const</span> diff = target - nums[i];
              </p>
              <p className="pl-8 text-purple-400">
                if <span className="text-zinc-300">(map.has(diff))</span>{" "}
                return <span className="text-zinc-300">[map.get(diff), i];</span>
              </p>
              <p className="pl-8 text-zinc-300">map.set(nums[i], i);</p>
              <p className="pl-4 text-zinc-300">&#125;</p>
              <p className="text-zinc-300">&#125;</p>
              <div className="pt-3">
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-accent hover:underline font-sans"
                >
                  <Code2 className="w-3 h-3" />
                  <span>Solve this problem in the Live Practice Arena →</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}