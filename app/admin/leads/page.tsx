import Link from 'next/link';
import { ArrowLeft, Mail, Phone, UserRound } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminLogout } from '@/components/admin/admin-logout';
import { AdminThemeToggle } from '@/components/admin/admin-theme-toggle';
type Enquiry = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  created_at: string;
};
export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }
  const { data: enquiries, error } = await supabase
    .from('enquiries')
    .select('id, name, email, phone, message, created_at')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to load enquiries:', error);
  }
  const leads: Enquiry[] = enquiries ?? [];
  return (
    <main className="bg-background text-foreground min-h-screen transition-colors duration-500">
      {' '}
      <div className="mx-auto max-w-360 px-5 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {' '}
        <header className="border-foreground/10 flex items-center justify-between border-b pb-6 sm:pb-8">
          {' '}
          <Link
            href="/admin"
            className="group text-muted hover:text-foreground flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors sm:text-xs"
          >
            {' '}
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />{' '}
            Dashboard{' '}
          </Link>{' '}
          <div className="flex items-center gap-3 sm:gap-6">
            {' '}
            <span className="text-muted hidden text-[10px] font-medium tracking-[0.2em] uppercase sm:block">
              {' '}
              Admin{' '}
            </span>{' '}
            <AdminThemeToggle /> <AdminLogout />{' '}
          </div>{' '}
        </header>{' '}
        <section className="pt-20 sm:pt-28 lg:pt-32">
          {' '}
          <div className="mb-7 flex items-center gap-4">
            {' '}
            <span className="bg-foreground/40 h-px w-8" />{' '}
            <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase">
              {' '}
              Client Enquiries{' '}
            </p>{' '}
          </div>{' '}
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            {' '}
            <div>
              {' '}
              <h1 className="font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-0.05em]">
                {' '}
                Leads.{' '}
              </h1>{' '}
              <p className="text-secondary mt-8 max-w-xl text-sm leading-7">
                {' '}
                Review incoming enquiries and follow up with potential clients.{' '}
              </p>{' '}
            </div>{' '}
            <div className="flex items-baseline gap-3">
              {' '}
              <span className="font-serif text-6xl leading-none tracking-[-0.04em]">
                {' '}
                {leads.length}{' '}
              </span>{' '}
              <span className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                {' '}
                Total{' '}
              </span>{' '}
            </div>{' '}
          </div>{' '}
        </section>{' '}
        <section className="border-foreground/10 mt-20 border-t sm:mt-28">
          {' '}
          {leads.length === 0 ? (
            <div className="py-24 text-center sm:py-32">
              {' '}
              <UserRound size={28} strokeWidth={1} className="text-muted mx-auto" />{' '}
              <h2 className="mt-6 font-serif text-4xl tracking-[-0.03em]"> No leads yet. </h2>{' '}
              <p className="text-secondary mx-auto mt-4 max-w-sm text-sm leading-7">
                {' '}
                New enquiries submitted through the website will appear here.{' '}
              </p>{' '}
            </div>
          ) : (
            <div>
              {' '}
              {leads.map((lead, index) => (
                <article
                  key={lead.id}
                  className="border-foreground/10 border-b py-8 sm:py-10 lg:py-12"
                >
                  {' '}
                  <div className="grid gap-8 lg:grid-cols-[72px_1fr_280px] lg:gap-10">
                    {' '}
                    <div className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                      {' '}
                      {String(index + 1).padStart(2, '0')}{' '}
                    </div>{' '}
                    <div>
                      {' '}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        {' '}
                        <h2 className="font-serif text-3xl tracking-[-0.025em] sm:text-4xl">
                          {' '}
                          {lead.name || 'Unnamed enquiry'}{' '}
                        </h2>{' '}
                        <time
                          dateTime={lead.created_at}
                          className="text-muted text-[9px] font-medium tracking-[0.2em] uppercase sm:text-[10px]"
                        >
                          {' '}
                          {new Date(lead.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                        </time>{' '}
                      </div>{' '}
                      {lead.message && (
                        <p className="text-secondary mt-6 max-w-2xl text-sm leading-7 whitespace-pre-wrap sm:text-base sm:leading-8">
                          {' '}
                          {lead.message}{' '}
                        </p>
                      )}{' '}
                    </div>{' '}
                    <div className="flex flex-col gap-4 text-sm">
                      {' '}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="group text-secondary hover:text-foreground flex min-w-0 items-center gap-3 transition-colors"
                        >
                          {' '}
                          <Mail size={15} strokeWidth={1.3} className="text-muted shrink-0" />{' '}
                          <span className="truncate">{lead.email}</span>{' '}
                        </a>
                      )}{' '}
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="group text-secondary hover:text-foreground flex items-center gap-3 transition-colors"
                        >
                          {' '}
                          <Phone size={15} strokeWidth={1.3} className="text-muted shrink-0" />{' '}
                          <span>{lead.phone}</span>{' '}
                        </a>
                      )}{' '}
                    </div>{' '}
                  </div>{' '}
                </article>
              ))}{' '}
            </div>
          )}{' '}
        </section>{' '}
        <footer className="border-foreground/10 text-muted mt-20 flex flex-col gap-4 border-t pt-8 text-[10px] tracking-[0.2em] uppercase sm:flex-row sm:items-center sm:justify-between">
          {' '}
          <span>ST Photography</span> <span>Lead Management</span>{' '}
        </footer>{' '}
      </div>{' '}
    </main>
  );
}
