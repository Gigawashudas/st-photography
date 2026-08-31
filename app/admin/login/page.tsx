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
    <main className="bg-background text-foreground min-h-screen transition-colors duration-500">
      <div className="mx-auto flex min-h-screen max-w-360 flex-col px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="border-foreground/10 flex items-center justify-between border-b pb-8">
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
            className="border-foreground/20 hover:border-foreground/50 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105"
          >
            {isDark ? <Sun size={15} strokeWidth={1.4} /> : <Moon size={15} strokeWidth={1.4} />}
          </button>
        </header>

        <div className="flex flex-1 items-center justify-center py-20">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <div className="mb-7 flex items-center gap-4">
                <span className="bg-foreground/40 h-px w-8" />

                <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase">
                  Studio Access
                </p>
              </div>

              <h1 className="font-serif text-6xl leading-none tracking-[-0.04em] sm:text-7xl">
                Welcome.
              </h1>

              <p className="text-secondary mt-5 text-sm leading-7">
                Sign in to manage your ST Photography portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <label className="block">
                <span className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase">
                  Email
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  required
                  className="border-foreground/20 text-foreground placeholder:text-secondary focus:border-foreground w-full border-b bg-transparent px-0 py-3.5 text-base leading-7 transition-colors outline-none"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="text-muted mb-3 block text-[10px] font-medium tracking-[0.18em] uppercase">
                  Password
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="border-foreground/20 text-foreground placeholder:text-secondary focus:border-foreground w-full border-b bg-transparent px-0 py-3.5 text-base leading-7 transition-colors outline-none"
                  placeholder="••••••••"
                />
              </label>

              {error && (
                <div className="border-foreground/15 text-secondary border px-4 py-3 text-sm leading-6">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="bg-foreground text-background flex min-h-12 w-full items-center justify-center gap-3 px-6 py-4 text-[10px] font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-13"
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

            <p className="text-muted mt-10 text-center text-[10px] tracking-[0.18em] uppercase">
              ST Photography · Admin
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
