"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <Link href="/" aria-label="ST Photography home" className="text-sm font-medium tracking-[0.18em] transition-opacity duration-300 hover:opacity-60">
          ST
        </Link>

        <nav className="flex flex-col items-end gap-2 text-[10px] font-medium uppercase tracking-[0.22em] sm:gap-3 sm:text-xs">
          <Link href="#work" className="transition-opacity duration-300 hover:opacity-50">
            Work
          </Link>

          <Link href="#about" className="transition-opacity duration-300 hover:opacity-50">
            About
          </Link>

          <Link href="#contact" className="transition-opacity duration-300 hover:opacity-50">
            Contact
          </Link>

          <button type="button" onClick={toggleTheme} aria-label="Toggle color theme" className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 hover:border-foreground/50 hover:scale-110">
            {resolvedTheme === "dark" ? <Sun size={12} strokeWidth={1.5} /> : <Moon size={12} strokeWidth={1.5} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
