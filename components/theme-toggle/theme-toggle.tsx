"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const savedTheme = localStorage.getItem("st-theme");

    return savedTheme !== "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("st-theme", isDark ? "dark" : "light");
  }, [isDark]);

  function toggleTheme() {
    setIsDark((current) => !current);
  }

  return (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 hover:scale-110 hover:border-foreground/50">
      {isDark ? <Sun size={12} strokeWidth={1.5} /> : <Moon size={12} strokeWidth={1.5} />}
    </button>
  );
}
