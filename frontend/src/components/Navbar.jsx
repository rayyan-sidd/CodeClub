import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/learning", label: "Learning" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
];

const linkClass = "hover:text-brand-text transition-colors";

const searchClass =
  "w-full px-[1.65rem] py-2 rounded-[1.08rem] border border-brand-border bg-brand-bg/80 text-brand-text placeholder-brand-muted focus:outline-none focus:ring-1 focus:ring-[hsl(156,40%,38%)] hover:ring-1 hover:ring-[hsl(156,40%,38%)] transition-all";

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2 min-w-0">
      <img src="/Logo.svg" className="h-10 sm:h-12 shrink-0" alt="CodeClub logo" />
      <div className="flex flex-col leading-tight">
        <span
          className="text-lg sm:text-xl font-bold text-brand-text leading-tight"
          style={{ lineHeight: "1.05" }}
        >
          Code<span className="text-brand-accent">Club</span>
        </span>
        <span
          className="text-xs text-brand-muted leading-tight"
          style={{ lineHeight: "1.05" }}
        >
          IU Lucknow
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-md bg-brand-surface/80 border-b border-brand-border">
      
      <div className="px-3 sm:px-4 md:px-6 py-2">
        
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
          

          <div className="justify-self-center min-w-0 -translate-x-[10%]">
            <Logo onClick={closeMenu} />
          </div>

          <button className="justify-self-end px-3 py-2 text-xs sm:text-sm font-semibold text-brand-bg bg-brand-accent rounded-lg hover:bg-[#0d9668] transition-all cursor-pointer whitespace-nowrap">
            Login
          </button>
        </div>

        {/* Desktop top row */}
        <div className="hidden lg:flex items-center gap-4">
          <Logo />

          <ul className="flex shrink-0 gap-4 xl:gap-8 text-sm xl:text-md font-medium text-brand-muted" style={{ marginLeft: "2%" }}>
            {navLinks.map(({ to, label }) => (
              <li key={to} className="whitespace-nowrap">
                <Link to={to} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex-1 flex items-center justify-center px-2 xl:px-4 min-w-0">
            <input type="text" placeholder="Search…" className={searchClass} style={{ minWidth: "120px", maxWidth: "90%" }} />
          </div>

          <button className="shrink-0 px-4 py-2 text-sm font-semibold text-brand-bg bg-brand-accent rounded-lg hover:bg-[#0d9668] transition-all cursor-pointer whitespace-nowrap">
            Login with IUL Email
          </button>
        </div>
      </div>

      {/* Mobile / tablet search row */}
      <div className="lg:hidden px-3 sm:px-4 pb-2">
        <input type="text" placeholder="Search…" className={searchClass} />
      </div>

      {/* Mobile / tablet nav menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-brand-border px-3 sm:px-4 py-3 bg-brand-surface/95">
          <ul className="flex flex-col gap-3 text-md font-medium text-brand-muted">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={`${linkClass} block py-1`} onClick={closeMenu}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
