import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, LogIn, Sparkles, Mail } from "lucide-react";

import CodeClubLogo from "./CodeClubLogo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/practice", label: "Practice" },
  { to: "/learning", label: "Learning" },
  { to: "/events", label: "Events & Media" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2.5 min-w-0 group">
      <CodeClubLogo className="h-9 sm:h-11 w-auto shrink-0 group-hover:scale-105 transition-transform" />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-2">
          <span
            className="text-lg sm:text-xl font-extrabold text-brand-text tracking-tight"
          >
            Code<span className="text-brand-accent">Club</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium text-brand-accent bg-brand-accent/10 border border-brand-accent/25">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span>IU</span>
          </span>
        </div>
        <span
          className="text-[11px] text-brand-muted font-medium tracking-wide"
        >
          Dept. of CSE
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loginSent, setLoginSent] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setLoginSent(true);
    setTimeout(() => {
      setLoginSent(false);
      setShowLoginModal(false);
      setEmailInput("");
    }, 2500);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl bg-brand-bg/85 border-b border-brand-border/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          {/* Mobile / tablet top row */}
          <div className="grid grid-cols-3 items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="justify-self-start p-2 -ml-2 text-brand-text hover:text-brand-accent transition-colors cursor-pointer"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="justify-self-center min-w-0">
              <Logo onClick={closeMenu} />
            </div>

            <button
              onClick={() => setShowLoginModal(true)}
              className="justify-self-end px-3 py-1.5 text-xs font-semibold text-brand-bg bg-brand-accent rounded-lg hover:bg-[#0d9668] transition-all cursor-pointer whitespace-nowrap shadow-[0_0_12px_rgba(16,185,129,0.25)]"
            >
              Login
            </button>
          </div>

          {/* Desktop top row */}
          <div className="hidden lg:flex items-center justify-between gap-6">
            <Logo />

            <ul className="flex shrink-0 gap-6 xl:gap-8 text-sm font-medium">
              {navLinks.map(({ to, label }) => (
                <li key={to} className="whitespace-nowrap">
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `transition-all py-1 px-1.5 relative ${
                        isActive
                          ? "text-brand-accent font-semibold after:absolute after:bottom-0 after:left-1 after:right-1 after:h-0.5 after:bg-brand-accent after:rounded-full"
                          : "text-brand-muted hover:text-brand-text"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowLoginModal(true)}
              className="shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-bg bg-brand-accent rounded-xl hover:bg-[#0d9668] transition-all cursor-pointer whitespace-nowrap shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>Login with IUL Email</span>
            </button>
          </div>
        </div>

        {/* Mobile / tablet nav menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-brand-border px-4 py-4 bg-brand-surface/95 backdrop-blur-md">
            <ul className="flex flex-col gap-2 text-base font-medium">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-brand-accent bg-brand-accent/10 font-semibold"
                          : "text-brand-muted hover:text-brand-text hover:bg-brand-stats-bg"
                      }`
                    }
                    onClick={closeMenu}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-brand-surface border border-brand-border rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-brand-muted hover:text-brand-text p-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full w-max mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>IUL Student Portal</span>
            </div>

            <h3 className="text-xl font-bold text-brand-text mb-2">
              Sign In to CodeClub
            </h3>
            <p className="text-sm text-brand-muted mb-6">
              Use your official Integral University email address (<span className="text-brand-accent">@iul.ac.in</span>) to access event passes, project repos, and hackathon certificates.
            </p>

            {loginSent ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-emerald-400">Magic Link Sent! 🚀</p>
                <p className="text-xs text-brand-muted mt-1">Check your IUL student inbox to sign in.</p>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-brand-muted mb-1.5">
                    Integral University Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="student@iul.ac.in"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-brand-text focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-brand-accent hover:bg-[#0d9668] text-brand-bg font-semibold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  Continue with Institutional Email
                </button>

                <p className="text-[11px] text-center text-brand-muted">
                  Don't have an @iul.ac.in email?{" "}
                  <Link
                    to="/contact"
                    onClick={() => setShowLoginModal(false)}
                    className="text-brand-accent hover:underline"
                  >
                    Contact coordinators
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
