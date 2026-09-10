'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return true;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    const theme = savedTheme === 'light' ? 'light' : 'dark';

    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = isDark ? 'light' : 'dark';

    root.classList.toggle('dark', nextTheme === 'dark');
    root.style.colorScheme = nextTheme;
    localStorage.setItem('theme', nextTheme);

    window.dispatchEvent(new Event('storage'));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="border-foreground/20 hover:border-foreground/50 flex h-8 w-8 items-center justify-center transition-colors duration-300"
    >
      {isDark ? (
        <Sun size={13} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={13} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
