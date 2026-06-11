"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#story", label: "Chuyện Tình" },
  { href: "#profile", label: "Dâu & Rể" },
  { href: "#events", label: "Sự Kiện" },
  { href: "#album", label: "Khoảnh Khắc" },
  { href: "#welcome", label: "Lời Ngỏ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the top the navbar sits over the dark hero image → use light text so it
  // stands out; once scrolled onto light sections, switch to the dark scheme.
  const linkColor = scrolled
    ? "text-primary opacity-70 hover:opacity-100"
    : "text-white opacity-90 hover:opacity-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]";

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-custom-light/90 shadow-sm border-b border-custom-gold/20"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
      id="navbar"
    >
      <div className="flex justify-between items-center px-margin-edge py-6 w-full max-w-container-max mx-auto">
        <a
          className={`font-headline-md text-headline-md tracking-widest italic font-semibold transition-colors duration-300 ${
            scrolled
              ? "text-primary"
              : "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          }`}
          href="#"
        >
          T &amp; T
        </a>
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              className={`${linkColor} transition-all duration-500 font-label-caps text-label-caps relative group`}
              href={link.href}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-custom-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            className={`font-bold border-b border-custom-gold pb-1 font-label-caps text-label-caps relative group transition-colors duration-300 ${
              scrolled
                ? "text-secondary"
                : "text-custom-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
            }`}
            href="#rsvp"
          >
            Xác Nhận
          </a>
        </div>
        <button
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? "text-primary" : "text-white"
          }`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="material-symbols-outlined">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-custom-light/95 backdrop-blur-md border-b border-custom-gold/20">
          <div className="flex flex-col items-center gap-6 py-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className="text-primary opacity-80 hover:text-custom-gold transition-colors font-label-caps text-label-caps"
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="text-secondary font-bold border-b border-custom-gold pb-1 font-label-caps text-label-caps"
              href="#rsvp"
              onClick={() => setMenuOpen(false)}
            >
              RSVP
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
