"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export function AdminThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    const nextIsDark = !isDark;

    setIsDark(nextIsDark);

    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("st-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("st-theme", "light");
    }
  }

  return (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/40 bg-background text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-foreground">
      {isDark ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
    </button>
  );
}
