"use client";

import { useEffect, useState } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setExiting(true), 200);
        window.setTimeout(() => onComplete(), 900);
      }
    }, 20);
    return () => window.clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-coffee flex items-end justify-start transition-opacity duration-700 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 md:gap-4 px-6 text-center">
        <svg
          viewBox="0 0 100 108"
          className="w-14 h-auto md:w-20 text-cream"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 16 C18 4 6 12 8 30 C10 48 16 68 25 88 C28 94 31 98 34 98 C38 98 39 82 41 74 C42 68 46 65 50 65 C54 65 58 68 59 74 C61 82 62 98 66 98 C69 98 72 94 75 88 C84 68 90 48 92 30 C94 12 82 4 68 16 C61 22 56 25 50 25 C44 25 39 22 32 16 Z" />
          <path d="M39 42 C43 50 57 50 61 42" />
        </svg>
        <span className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight leading-none text-cream">
          Dental Kab
        </span>
      </div>
      <span className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-cream">
        {count}
      </span>
    </div>
  );
}
