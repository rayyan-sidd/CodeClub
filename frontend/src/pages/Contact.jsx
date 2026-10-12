import { useState } from "react";
import {
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ExternalLink,
  Users,
} from "lucide-react";

// Inline brand SVGs for consistency
function DiscordIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

const FAQS = [
  {
    q: "Who is eligible to join CodeClub?",
    a: "Every student enrolled at Integral University Lucknow across all departments (B.Tech CSE, BCA, MCA, Diploma, and other disciplines) and all study years is welcome to participate in our events, workshops, and hackathons.",
  },
  {
    q: "Do I need prior coding experience to join?",
    a: "Not at all! We host beginner-friendly bootcamps ranging from Git & GitHub fundamentals and Web Development to Competitive Programming basics. Curiosity to learn is all you need.",
  },
  {
    q: "How are hackathons and events evaluated?",
    a: "Our hackathons (like Webathon and Code Clash) feature mentorship from senior students, alumni, and faculty, judged based on innovation, technical implementation, code quality, and final presentation.",
  },
  {
    q: "How can I join the core organizing team?",
    a: "We open recruitment drives at the beginning of each academic semester for roles including Web Developers, Designers, Event Managers, and Outreach Leads. Keep an eye on announcements!",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    category: "General Query",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    // In a live app, this can insert into a supabase table or form API
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
          Let’s Build Together
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Have a question about an upcoming hackathon, want to suggest a workshop,
          collaborate on an open-source project, or join as a volunteer? We’d love to hear from you.
        </p>
      </div>

      {/* 3 Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Card 1: Community Discord / WhatsApp */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-accent/50 rounded-2xl p-6 transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
              <DiscordIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-text mb-2">Join the Community</h3>
            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              Connect with fellow student developers, ask programming doubts, find hackathon teammates, and get live alerts.
            </p>
          </div>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
          >
            <span>Join Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card 2: Campus Hub */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-accent/50 rounded-2xl p-6 transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-text mb-2">Campus Location</h3>
            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              Faculty of Engineering & Technology (FET), Department of CSE,
              Integral University, Kursi Road, Lucknow - 226026.
            </p>
          </div>
          <span className="text-xs font-semibold text-brand-muted">
            Mon – Fri · 9:00 AM – 4:00 PM
          </span>
        </div>

        {/* Card 3: Email */}
        <div className="bg-brand-surface border border-brand-border hover:border-brand-accent/50 rounded-2xl p-6 transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between">
          <div>
            <div className="w-11 h-11 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-text mb-2">Direct Inquiries</h3>
            <p className="text-xs text-brand-muted leading-relaxed mb-4">
              For official sponsorships, speaker invitations, and university approvals, write directly to our student leads.
            </p>
          </div>
          <a
            href="mailto:codeclub@iul.ac.in"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-white transition-colors"
          >
            <span>codeclub@iul.ac.in</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Form & FAQ Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-brand-accent" />
            <h2 className="text-xl font-bold text-brand-text">Send Us a Message</h2>
          </div>

          {submitted ? (
            <div className="py-12 px-6 text-center bg-brand-bg/50 border border-brand-accent/30 rounded-xl">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-brand-text mb-2">Message Sent!</h3>
              <p className="text-sm text-brand-muted max-w-md mx-auto mb-6">
                Thank you, <span className="text-brand-accent">{formData.name}</span>. Our coordinators will review your message and reply via {formData.email}.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    department: "",
                    category: "General Query",
                    message: "",
                  });
                }}
                className="px-5 py-2 text-xs font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rayyan Siddiqui"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@iul.ac.in"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-1.5">
                    Branch / Department
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B.Tech CSE (3rd Year)"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-1.5">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors cursor-pointer"
                  >
                    <option value="General Query">General Query</option>
                    <option value="Hackathons & Events">Hackathons & Events</option>
                    <option value="Workshop Proposal">Suggest a Workshop</option>
                    <option value="Join Core Team">Join Core Team / Volunteer</option>
                    <option value="Sponsorship / Partnership">Sponsorship / Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-brand-muted mb-1.5">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help? Share your ideas or question..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-brand-accent hover:bg-[#0d9668] text-brand-bg font-semibold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* FAQs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-brand-accent" />
            <h2 className="text-xl font-bold text-brand-text">Frequently Asked</h2>
          </div>
          <p className="text-xs text-brand-muted mb-4">
            Quick answers to questions student developers frequently ask us.
          </p>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 text-sm font-semibold text-brand-text hover:text-brand-accent transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-muted shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-brand-accent" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-brand-muted leading-relaxed border-t border-brand-border/40 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
