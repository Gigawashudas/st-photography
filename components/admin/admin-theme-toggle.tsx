'use client';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
type Theme = 'dark' | 'light';
function getCurrentTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'dark';
  }
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}
export function AdminThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);
  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('st-theme', nextTheme);
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="border-foreground/40 bg-background text-foreground hover:border-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-sm transition-all duration-300 hover:scale-105"
    >
      {' '}
      {isDark ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}{' '}
    </button>
  );
}
