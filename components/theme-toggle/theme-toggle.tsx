"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("st-theme");

    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
      return;
    }

    document.documentElement.classList.add("dark");
    setIsDark(true);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;

    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("st-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("st-theme", "light");
    }

    setIsDark(nextIsDark);
  };

  return (
    <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 hover:scale-110 hover:border-foreground/50">
      {isDark ? <Sun size={12} strokeWidth={1.5} /> : <Moon size={12} strokeWidth={1.5} />}
    </button>
  );
}
