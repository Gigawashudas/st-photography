'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
const THEME_KEY = 'st-theme';
function getStoredTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return window.localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
}
function applyTheme(theme: 'dark' | 'light') {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}
export function AdminThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme);
  useEffect(() => {
    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);
  function toggleTheme() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(THEME_KEY, nextTheme);
      applyTheme(nextTheme);
      return nextTheme;
    });
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
