"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#story", label: "Chuyện Tình" },
  { href: "#profile", label: "Dâu & Rể" },
  { href: "#events", label: "Sự Kiện" },
  { href: "#album", label: "Khoảnh Khắc" },
  { href: "#welcome", label: "Lời Ngỏ" },
];

const SECTION_IDS = [...NAV_LINKS.map((l) => l.href.slice(1)), "rsvp"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item whose section crosses a thin band near
  // the vertical center of the viewport (top inset -45%, bottom -50%, see
  // rootMargin below). Empty activeId = over the hero, nothing in the band.
  useEffect(() => {
    // Track which sections currently cross the band, then pick the topmost one
    // (document order). Without removing sections on exit, the last-entered id
    // would stick forever once nothing else is in the band (e.g. back over hero).
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveId(SECTION_IDS.find((id) => visible.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // At the top the navbar sits over the dark hero image → use light text so it
  // stands out; once scrolled onto light sections, switch to the dark scheme.
  const linkColor = scrolled
    ? "text-primary opacity-70 hover:opacity-100"
    : "text-white opacity-90 hover:opacity-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-custom-light shadow-sm border-b border-custom-gold/20"
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
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                className={`${
                  isActive ? "text-custom-gold opacity-100" : linkColor
                } transition-all duration-500 font-label-caps text-label-caps relative group`}
                href={link.href}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-custom-gold transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            );
          })}
          <a
            className={`font-bold border-b border-custom-gold pb-1 font-label-caps text-label-caps relative group transition-colors duration-300 ${
              activeId === "rsvp"
                ? "text-custom-gold"
                : scrolled
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
                className={`${
                  activeId === link.href.slice(1)
                    ? "text-custom-gold opacity-100"
                    : "text-primary opacity-80 hover:text-custom-gold"
                } transition-colors font-label-caps text-label-caps`}
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
