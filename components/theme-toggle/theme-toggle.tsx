'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
const THEME_KEY = 'st-theme';
function getStoredTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  const savedTheme = window.localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') {
    return 'light';
  }
  return 'dark';
}
function applyTheme(theme: 'dark' | 'light') {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
}
export function ThemeToggle() {
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
      className="border-foreground/20 hover:border-foreground/50 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110"
    >
      {' '}
      {isDark ? <Sun size={13} strokeWidth={1.5} /> : <Moon size={13} strokeWidth={1.5} />}{' '}
    </button>
  );
}
