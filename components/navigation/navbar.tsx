'use client';

import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-start justify-between px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <Link
          href="/"
          aria-label="ST Photography home"
          className="text-sm font-medium tracking-[0.18em] transition-opacity duration-300 hover:opacity-60"
        >
          ST
        </Link>

        <nav className="flex flex-col items-end gap-2 text-[10px] font-medium uppercase tracking-[0.22em] sm:gap-3 sm:text-xs">
          <Link href="/work" className="transition-opacity duration-300 hover:opacity-50">
            Work
          </Link>

          <Link href="/#about" className="transition-opacity duration-300 hover:opacity-50">
            About
          </Link>

          <Link href="/#contact" className="transition-opacity duration-300 hover:opacity-50">
            Contact
          </Link>

          <div className="mt-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
