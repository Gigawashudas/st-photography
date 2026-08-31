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
export function ThemeToggle() {
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
      className="border-foreground/20 hover:border-foreground/50 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
    >
      {' '}
      {isDark ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}{' '}
    </button>
  );
}
