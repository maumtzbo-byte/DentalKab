"use client";

import { useState, type ReactNode } from "react";
import { SplashScreen } from "@/components/splash-screen";

export function RootClientShell({ children }: { children: ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {children}
    </>
  );
}
