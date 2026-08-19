"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/services" },
  { label: "Nosotros", to: "/#nosotros" },
  { label: "Ubicación", to: "/#ubicacion" },
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
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-2 md:py-3 bg-cream/80 backdrop-blur-md">
        <Link href="/" className="flex flex-col">
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none text-ink-900">
            Dental
          </span>
          <span className="text-xl md:text-2xl font-extrabold uppercase tracking-tight leading-none -mt-1.5 md:-mt-2 text-ink-900">
            Kab
          </span>
          <span className="text-[8px] md:text-[9px] font-medium leading-none mt-1.5 md:mt-2 text-ink-700">
            atención de calidad
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/book"
            className="px-5 py-2.5 rounded-full border border-ochre text-sm font-semibold text-ink-900 hover:bg-ink-900 hover:text-cream hover:border-ink-900 transition-colors duration-200"
          >
            Urgencia Dental
          </Link>
          <Link
            href="/book"
            className="px-6 py-3 bg-peach rounded-full text-sm font-semibold text-ink-900 hover:bg-peach-dark transition-colors duration-200"
          >
            Reservar Cita
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="px-6 py-3 bg-cream rounded-full border border-ink-900/15 text-sm font-semibold text-ink-900 hover:bg-ink-900 hover:text-cream hover:border-ink-900 transition-colors duration-200"
          >
            Menú
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/book"
            className="px-4 py-2 bg-peach rounded-full text-xs font-semibold text-ink-900 hover:bg-peach-dark transition-colors duration-200"
          >
            Reservar
          </Link>
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center relative shrink-0"
            aria-label="Abrir menú"
            onClick={() => setMenuOpen((open) => !open)}
          >
          <span
            className={`absolute h-0.5 w-6 bg-ink-900 rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-ink-900 rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
            <span
              className={`absolute h-0.5 w-6 bg-ink-900 rounded-full transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                menuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 ${menuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-ink-900/20 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-cream shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-center h-full px-8 gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.to}
                className={`text-4xl font-bold text-ink-900 hover:text-ochre transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  menuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="mt-8 pt-8 border-t border-line transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(32px)",
                transitionDelay: menuOpen ? "450ms" : "0ms",
              }}
            >
              <p className="text-sm font-semibold text-ink-900 mb-4">Urgencia Dental</p>
              <Link
                href="/book"
                className="block w-full text-center px-6 py-4 bg-peach rounded-full text-ink-900 text-sm font-semibold hover:bg-peach-dark transition-colors duration-200"
              >
                Reservar Cita
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
