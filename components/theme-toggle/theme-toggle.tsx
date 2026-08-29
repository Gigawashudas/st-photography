"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("st-theme");

    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      return;
    }

    setIsDark(true);
    document.documentElement.classList.add("dark");
  }, []);

  function toggleTheme() {
    setIsDark((current) => {
      const next = !current;

      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("st-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("st-theme", "light");
      }

      return next;
    });
  }

  return (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 hover:scale-110 hover:border-foreground/50">
      {isDark ? <Sun size={12} strokeWidth={1.5} /> : <Moon size={12} strokeWidth={1.5} />}
    </button>
  );
}
