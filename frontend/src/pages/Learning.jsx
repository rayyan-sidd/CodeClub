import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Code2,
  Cpu,
  GitBranch,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  Bookmark,
  Terminal,
  Compass,
} from "lucide-react";

const LEARNING_TRACKS = [
  {
    id: "web-dev",
    title: "Fullstack Web Development",
    category: "Web & Mobile",
    level: "Beginner to Advanced",
    duration: "8 - 10 Weeks",
    icon: Code2,
    description:
      "Master modern web engineering from HTML/CSS fundamentals to production React applications and Supabase backends.",
    topics: [
      "HTML5, Modern CSS & Tailwind CSS v4",
      "JavaScript ES6+, DOM & Async / Await",
      "React 19, Hooks, State & React Router",
      "Backend APIs, REST & Supabase Database",
      "Authentication, Row Level Security & Deployment",
    ],
    recommendedTools: ["VS Code", "Vite", "Tailwind CSS", "Supabase", "Vercel"],
    resourceLink: "https://roadmap.sh/full-stack",
  },
  {
    id: "dsa",
    title: "Data Structures & Algorithms (DSA)",
    category: "Problem Solving",
    level: "All Levels",
    duration: "Continuous",
    icon: Terminal,
    description:
      "Prepare for coding interviews and competitive programming contests (Code Clash, ICPC, LeetCode weekly contests).",
    topics: [
      "Time & Space Complexity (Big-O)",
      "Arrays, Strings, Hash Maps & Pointers",
      "Linked Lists, Stacks & Queues",
      "Recursion, Trees & Binary Search Trees",
      "Graphs, BFS/DFS & Dynamic Programming",
    ],
    recommendedTools: ["C++ / Java / Python", "LeetCode", "CodeChef", "Codeforces"],
    resourceLink: "https://roadmap.sh/datastructures-and-algorithms",
  },
  {
    id: "ai-ml",
    title: "AI, Machine Learning & LLMs",
    category: "Intelligent Systems",
    level: "Intermediate",
    duration: "8 - 12 Weeks",
    icon: Cpu,
    description:
      "Explore mathematics, statistical modeling, machine learning algorithms, and building applications with Large Language Models.",
    topics: [
      "Python for Data Science (NumPy, Pandas, Matplotlib)",
      "Supervised & Unsupervised Machine Learning",
      "Neural Networks & Deep Learning with PyTorch",
      "Natural Language Processing (NLP)",
      "Prompt Engineering, LangChain & LLM APIs",
    ],
    recommendedTools: ["Jupyter Notebooks", "Google Colab", "PyTorch", "HuggingFace"],
    resourceLink: "https://roadmap.sh/ai-data-scientist",
  },
  {
    id: "git-oss",
    title: "Git, GitHub & Open Source",
    category: "Engineering Workflows",
    level: "Beginner Friendly",
    duration: "2 - 3 Weeks",
    icon: GitBranch,
    description:
      "Learn team collaboration, branch strategies, code reviews, and contribute your first pull requests to open-source projects.",
    topics: [
      "Version Control Concepts & Git Architecture",
      "Commits, Branches, Merges & Rebasing",
      "GitHub Pull Requests & Code Reviews",
      "Resolving Merge Conflicts Like a Pro",
      "Contributing to Hacktoberfest & Open Source",
    ],
    recommendedTools: ["Git CLI", "GitHub", "GitHub Desktop", "Markdown"],
    resourceLink: "https://roadmap.sh/git-github",
  },
  {
    id: "devops",
    title: "DevOps & Cloud Fundamentals",
    category: "Infrastructure",
    level: "Intermediate",
    duration: "4 - 6 Weeks",
    icon: Layers,
    description:
      "Understand containerization, CI/CD automation, cloud hosting, and how modern applications scale in production.",
    topics: [
      "Linux Command Line & Shell Scripting",
      "Docker Containers & Docker Compose",
      "CI/CD Pipelines with GitHub Actions",
      "Cloud Deployment (Vercel, AWS, Cloudflare)",
      "Monitoring, Domains, SSL & DNS Basics",
    ],
    recommendedTools: ["Ubuntu/Debian", "Docker", "GitHub Actions", "Vercel"],
    resourceLink: "https://roadmap.sh/devops",
  },
];

const PLATFORMS = [
  {
    name: "Roadmap.sh",
    role: "Visual Developer Roadmaps",
    link: "https://roadmap.sh",
  },
  {
    name: "LeetCode",
    role: "DSA & Problem Solving",
    link: "https://leetcode.com",
  },
  {
    name: "FreeCodeCamp",
    role: "Interactive Coding Certifications",
    link: "https://freecodecamp.org",
  },
  {
    name: "Kaggle",
    role: "Machine Learning & Datasets",
    link: "https://kaggle.com",
  },
];

export default function Learning() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTracks =
    activeTab === "all"
      ? LEARNING_TRACKS
      : LEARNING_TRACKS.filter((t) => t.category.toLowerCase().includes(activeTab));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Developer Roadmaps</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
          CodeClub Learning Hub
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Structured learning tracks, industry-standard roadmaps, and vetted resources
          designed to take you from college fresher to production-ready engineer.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {[
          { id: "all", label: "All Tracks" },
          { id: "web", label: "Web & Mobile" },
          { id: "problem", label: "DSA & Algorithms" },
          { id: "intelligent", label: "AI & ML" },
          { id: "engineering", label: "Git & Workflows" },
          { id: "infrastructure", label: "DevOps & Cloud" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-brand-accent text-brand-bg font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {filteredTracks.map((track) => {
          const Icon = track.icon;
          return (
            <div
              key={track.id}
              className="bg-brand-surface border border-brand-border hover:border-brand-accent/60 rounded-2xl p-6 sm:p-8 transition-all hover:scale-[1.01] shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[11px] font-semibold text-brand-accent bg-brand-accent/10 px-2.5 py-0.5 rounded-full border border-brand-accent/20">
                      {track.level}
                    </span>
                    <span className="text-[11px] text-brand-muted">
                      {track.duration}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand-accent transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                  {track.description}
                </p>

                {/* Modules list */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted/80">
                    Syllabus Highlights:
                  </p>
                  {track.topics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-brand-text"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended tools pills */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted/80 mb-2">
                    Key Tools & Tech:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {track.recommendedTools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-brand-bg border border-brand-border text-brand-muted"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between gap-4">
                <a
                  href={track.resourceLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
                >
                  <span>View Full Interactive Roadmap</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  to="/contact"
                  className="text-xs text-brand-muted hover:text-brand-text transition-colors"
                >
                  Join Study Group →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended Platforms Banner */}
      <div className="bg-brand-surface/70 border border-brand-border rounded-2xl p-6 sm:p-8 backdrop-blur-sm mb-16">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-brand-accent" />
          <h3 className="text-lg font-bold text-brand-text">
            Recommended Practice Platforms
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted mb-6">
          Pair our curriculum with top interactive platforms vetted by senior members of CodeClub:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-xl bg-brand-bg border border-brand-border hover:border-brand-accent/50 transition-all hover:scale-105 block"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-sm text-brand-text">
                  {platform.name}
                </h4>
                <ExternalLink className="w-3 h-3 text-brand-accent" />
              </div>
              <p className="text-[11px] text-brand-muted">{platform.role}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Call to action: Want to host a workshop? */}
      <div className="bg-gradient-to-r from-brand-surface via-brand-surface to-brand-accent/10 border border-brand-border rounded-2xl p-8 text-center max-w-3xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-brand-text mb-2">
          Want to Lead a Workshop or Request a Topic?
        </h3>
        <p className="text-xs sm:text-sm text-brand-muted max-w-xl mx-auto mb-6">
          CodeClub is built by students, for students. If there’s a framework, language,
          or skill you want us to cover, let our team know!
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-accent hover:bg-[#0d9668] text-brand-bg font-semibold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <span>Request or Propose a Session</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
