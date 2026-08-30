'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.replace('/admin/login');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-foreground"
    >
      Logout
      <LogOut
        size={13}
        strokeWidth={1.2}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />
    </button>
  );
}
