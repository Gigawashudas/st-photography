'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '../theme-toggle/theme-toggle';

const navigation = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-black/[0.08] bg-white/[0.92] backdrop-blur-xl dark:border-white/[0.1] dark:bg-black/[0.92]">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            aria-label="ST Photography home"
            onClick={closeMenu}
            className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-50"
          >
            <Image
              src="/logo-dark.png"
              alt="ST Photography logo"
              width={40}
              height={40}
              priority
              className="h-7 w-7 object-contain sm:h-8 sm:w-8"
            />

            <span className="type-nav text-foreground whitespace-nowrap">ST Photography</span>
          </Link>

          <div className="hidden items-center lg:flex">
            <nav aria-label="Main navigation" className="flex items-center gap-10">
              {navigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'type-nav text-foreground relative',
                      'transition-opacity duration-300 hover:opacity-50',
                      'after:absolute after:-bottom-2 after:left-0 after:h-px',
                      'after:bg-foreground after:transition-all after:duration-500',
                      active ? 'after:w-full' : 'after:w-0',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-foreground/10 ml-10 border-l pl-6">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="group text-foreground flex h-10 w-10 items-center justify-center"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-500 ${
                    menuOpen ? 'top-[7px] rotate-45' : 'top-[3px] group-hover:-translate-y-px'
                  }`}
                />

                <span
                  className={`absolute top-[7px] left-0 h-px w-5 bg-current transition-opacity duration-300 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-all duration-500 ${
                    menuOpen ? 'top-[7px] -rotate-45' : 'top-[11px] group-hover:translate-y-px'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 -z-10 lg:hidden ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`bg-background absolute inset-0 transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="relative flex h-full flex-col px-6 pt-28 pb-8 sm:px-8 sm:pt-32">
          <div
            className={`editorial-label mb-12 transition-all duration-700 sm:mb-16 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <span className="editorial-rule" />
            <span className="type-label-sm text-muted">Navigation</span>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navigation.map((item, index) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={`group border-foreground/10 text-foreground flex items-center justify-between border-b py-6 transition-all duration-700 sm:py-8 ${
                    menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${100 + index * 90}ms` : '0ms',
                  }}
                >
                  <span className="flex items-center gap-4 text-[clamp(2.5rem,12vw,5rem)] leading-[0.9] font-medium tracking-[-0.055em] transition-transform duration-500 group-hover:translate-x-2">
                    {active && (
                      <span aria-hidden="true" className="bg-foreground h-px w-6 shrink-0 sm:w-8" />
                    )}

                    {item.label}
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-muted text-lg font-light transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`border-foreground/10 mt-auto grid grid-cols-2 gap-8 border-t pt-6 transition-all duration-700 ${
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{
              transitionDelay: menuOpen ? '420ms' : '0ms',
            }}
          >
            <div>
              <p className="type-label-sm text-muted mb-2">Studio</p>
              <p className="type-meta text-foreground">ST Photography</p>
            </div>

            <div>
              <p className="type-label-sm text-muted mb-2">Speciality</p>
              <p className="type-meta text-foreground">Interior Photography</p>
              <p className="type-meta text-foreground mt-1">&amp; Cinematography</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
