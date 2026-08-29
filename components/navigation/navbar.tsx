"use client";

import Link from "next/link";
import { ThemeToggle } from "../theme-toggle/theme-toggle";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between px-5 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <Link href="/" aria-label="ST Photography home" className="text-[11px] font-medium uppercase tracking-[0.22em] transition-opacity duration-300 hover:opacity-60 sm:text-sm sm:tracking-[0.18em]">
          ST
        </Link>

        <nav className="flex flex-col items-end gap-2 text-[9px] font-medium uppercase tracking-[0.24em] sm:gap-3 sm:text-xs sm:tracking-[0.22em]">
          <Link href="#work" className="transition-opacity duration-300 hover:opacity-50">
            Work
          </Link>

          <Link href="#about" className="transition-opacity duration-300 hover:opacity-50">
            About
          </Link>

          <Link href="#contact" className="transition-opacity duration-300 hover:opacity-50">
            Contact
          </Link>

          <div className="mt-1.5 sm:mt-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
