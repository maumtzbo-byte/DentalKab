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
      className={`fixed inset-0 z-[100] bg-white flex items-end justify-start transition-opacity duration-700 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="text-7xl md:text-9xl font-bold tabular-nums p-6 md:p-10 leading-none text-black">
        {count}
      </span>
    </div>
  );
}
