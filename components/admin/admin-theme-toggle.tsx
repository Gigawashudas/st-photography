'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);

  return () => {
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function getServerSnapshot(): Theme {
  return 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  localStorage.setItem('theme', theme);

  window.dispatchEvent(new Event('storage'));
}

export function AdminThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isDark = theme === 'dark';

  function toggleTheme() {
    const nextTheme: Theme = isDark ? 'light' : 'dark';

    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="border-foreground/40 bg-background text-foreground hover:border-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-300 hover:scale-105"
    >
      {isDark ? (
        <Sun size={17} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Moon size={17} strokeWidth={1.5} aria-hidden="true" />
      )}
    </button>
  );
}
