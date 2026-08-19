"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/#about" },
  { label: "Gallery", to: "/#gallery" },
  { label: "Contact", to: "/#contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-white/80 backdrop-blur-md">
        <Link href="/" className="flex flex-col">
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none">Dental</span>
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none -mt-1.5 md:-mt-2">
            Health
          </span>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2">
            quality healthcare
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="px-6 py-3 bg-white rounded-full border border-black text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-200"
          >
            Menu
          </button>
          <span className="text-sm font-semibold text-black">Dental Emergency</span>
        </div>

        <button
          type="button"
          className="md:hidden w-10 h-10 flex items-center justify-center relative"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          />
        </button>
      </nav>

      <div className={`fixed inset-0 z-40 ${menuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.to}
                className={`text-4xl font-bold text-black hover:text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="mt-8 pt-8 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(32px)",
                transitionDelay: menuOpen ? "450ms" : "0ms",
              }}
            >
              <p className="text-sm font-semibold text-black mb-4">Dental Emergency</p>
              <Link
                href="/book"
                className="block w-full text-center px-6 py-4 bg-black rounded-full text-white text-sm font-semibold hover:bg-neutral-800 transition-colors duration-200"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
