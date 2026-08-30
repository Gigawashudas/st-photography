'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Loader2, LogIn, Moon, Sun } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return localStorage.getItem('st-theme') !== 'light';
  });

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);

    document.documentElement.classList.toggle('dark', nextTheme);
    localStorage.setItem('st-theme', nextTheme ? 'dark' : 'light');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (loginError) {
      setError('Invalid email or password.');
      setIsLoading(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <div className="mx-auto flex min-h-screen max-w-360 flex-col px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-8">
          <Link
            href="/"
            className="text-sm font-medium tracking-[0.18em] transition-opacity hover:opacity-50"
          >
            ST
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 hover:scale-105 hover:border-foreground/50"
          >
            {isDark ? <Sun size={15} strokeWidth={1.4} /> : <Moon size={15} strokeWidth={1.4} />}
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center py-20">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-8 bg-foreground/40" />

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
                  Studio Access
                </p>
              </div>

              <h1 className="font-serif text-6xl leading-none tracking-[-0.04em] sm:text-7xl">
                Welcome.
              </h1>

              <p className="mt-5 text-sm leading-7 text-secondary">
                Sign in to manage your ST Photography portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <label className="block">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  Password
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full border-b border-foreground/20 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-foreground"
                  placeholder="••••••••"
                />
              </label>

              {error && (
                <div className="border border-foreground/15 px-4 py-3 text-xs leading-6 text-secondary">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 bg-foreground px-6 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} strokeWidth={1.4} className="animate-spin" />
                    Signing In
                  </>
                ) : (
                  <>
                    <LogIn size={14} strokeWidth={1.4} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <p className="mt-10 text-center text-[9px] uppercase tracking-[0.18em] text-muted">
              ST Photography · Admin
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
