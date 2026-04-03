"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SiteSettings, Announcement } from "@/types";

const navLinks = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Cuisine", href: "/dining" },
  { label: "Banquet Hall", href: "/banquet" },
  { label: "Spa & Wellness", href: "/spa" },
  { label: "Events", href: "/events" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ settings, announcements = [] }: { settings: SiteSettings; announcements?: Announcement[] }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // announcements prop kept for API compatibility but bar is hidden
  void announcements;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "header-glass shadow-md" : "bg-transparent"}`}>
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className={`lg:hidden transition-colors p-1 ${scrolled ? "text-charcoal" : "text-white"}`} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        <div className="flex-1 text-center">
          <Link href="/" className="inline-block">
            <p className={`font-serif text-base sm:text-lg md:text-xl tracking-[0.12em] uppercase transition-colors duration-500 ${scrolled ? "text-charcoal" : "text-white"}`}>
              {settings.hotelName}
              <span className="block text-[9px] sm:text-[10px] tracking-[0.25em] font-sans font-light mt-0.5">{settings.subtitle}</span>
            </p>
          </Link>
        </div>

        <Link href="/booking" className="bg-gold hover:bg-gold-dark text-white font-sans text-[10px] tracking-[0.18em] px-4 sm:px-5 py-2 transition-colors duration-300">BOOK</Link>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:block">
        <div className={`mx-6 h-px transition-colors duration-500 ${scrolled ? "bg-gold/20" : "bg-white/20"}`} />
        <ul className="flex items-center justify-center gap-4 xl:gap-6 py-2 px-4">
          {navLinks.map((link) => {
            const isActive = link.href === pathname || (link.href.startsWith("/#") && isHome);
            return (
              <li key={link.label}>
                <Link href={link.href} className={`relative font-sans text-[10px] tracking-[0.1em] uppercase transition-colors duration-300 hover:text-gold group ${isActive ? "text-gold" : scrolled ? "text-charcoal" : "text-white"}`}>
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-0 z-40 transition-all duration-500 ${menuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gold/10">
            <div>
              <h2 className="font-serif text-lg tracking-[0.1em] text-charcoal uppercase">{settings.hotelName}</h2>
              <p className="font-sans text-[10px] tracking-[0.2em] text-text-light mt-1">{settings.subtitle}</p>
            </div>
            <button onClick={() => setMenuOpen(false)} className="text-charcoal p-1" aria-label="Close menu">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex items-center px-6 py-3 border-b border-gray-100">
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="font-sans text-xs text-text-secondary">{settings.phone}</a>
          </div>
          <ul className="py-4 overflow-y-auto max-h-[calc(100vh-180px)]">
            {[...navLinks, { label: "Book Now", href: "/booking" }].map((link, i) => (
              <li key={link.label}
                style={{
                  transitionDelay: menuOpen ? `${i * 50}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-colors hover:bg-beige/50 ${link.label === "Book Now" ? "text-gold font-semibold hover:text-gold-dark" : "text-charcoal hover:text-gold"}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
