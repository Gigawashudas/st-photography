'use client';

import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full max-w-[1600px] items-start justify-between px-5 py-5 sm:px-8 sm:py-7 md:px-9 md:py-8 lg:px-10 lg:py-10">
        <Link
          href="/"
          aria-label="ST Photography home"
          className="text-sm font-medium tracking-[0.18em] transition-opacity duration-300 hover:opacity-60 sm:text-base"
        >
          ST
        </Link>

        <nav className="flex flex-col items-end gap-2 text-[9px] font-medium tracking-[0.22em] uppercase sm:gap-3 sm:text-[10px] md:gap-3.5 md:text-[11px] lg:gap-3 lg:text-xs">
          <Link
            href="/work"
            className="min-h-5 transition-opacity duration-300 hover:opacity-50 md:min-h-6"
          >
            Work
          </Link>

          <Link
            href="/about"
            className="min-h-5 transition-opacity duration-300 hover:opacity-50 md:min-h-6"
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="min-h-5 transition-opacity duration-300 hover:opacity-50 md:min-h-6"
          >
            Contact
          </Link>

          <div className="mt-1.5 md:mt-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
