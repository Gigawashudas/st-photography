import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  UserRound,
  Wallet,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminLogout } from '@/components/admin/admin-logout';
import { AdminThemeToggle } from '@/components/admin/admin-theme-toggle';

type Enquiry = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  project_date: string | null;
  location: string | null;
  budget: string | null;
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
    .select('id, name, email, phone, service, project_date, location, budget, message, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to load enquiries:', error);
  }

  const leads: Enquiry[] = enquiries ?? [];

  return (
    <main className="bg-background text-foreground min-h-screen transition-colors duration-500">
      <div className="mx-auto max-w-[1440px] px-5 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        {/* Header */}
        <header className="border-foreground/10 flex items-center justify-between border-b pb-6 sm:pb-8">
          <Link
            href="/admin"
            className="group text-muted hover:text-foreground flex items-center gap-3 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors sm:text-xs"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Dashboard
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-muted hidden text-[10px] font-medium tracking-[0.2em] uppercase sm:block">
              Admin
            </span>

            <AdminThemeToggle />

            <AdminLogout />
          </div>
        </header>

        {/* Hero */}
        <section className="pt-20 sm:pt-28 lg:pt-32">
          <div className="mb-7 flex items-center gap-4">
            <span className="bg-foreground/40 h-px w-8" />

            <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase">
              Client Enquiries
            </p>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-0.05em]">
                Leads.
              </h1>

              <p className="text-secondary mt-8 max-w-xl text-sm leading-7 sm:text-base">
                Every enquiry from your website, organized in one place so you can review, respond,
                and follow up with potential clients.
              </p>
            </div>

            <div className="flex items-baseline gap-3 lg:pb-2">
              <span className="font-serif text-7xl leading-none tracking-[-0.05em] sm:text-8xl">
                {leads.length}
              </span>

              <span className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                {leads.length === 1 ? 'Enquiry' : 'Enquiries'}
              </span>
            </div>
          </div>
        </section>

        {/* Leads */}
        <section className="border-foreground/10 mt-20 border-t sm:mt-28">
          {leads.length === 0 ? (
            <EmptyState />
          ) : (
            <div>
              {leads.map((lead, index) => (
                <LeadCard key={lead.id} lead={lead} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-foreground/10 text-muted mt-20 flex flex-col gap-4 border-t pt-8 text-[10px] tracking-[0.2em] uppercase sm:flex-row sm:items-center sm:justify-between">
          <span>ST Photography</span>

          <span>Lead Management</span>
        </footer>
      </div>
    </main>
  );
}

function LeadCard({ lead, index }: { lead: Enquiry; index: number }) {
  const formattedDate = formatDate(lead.created_at);

  const formattedProjectDate = lead.project_date ? formatProjectDate(lead.project_date) : null;

  return (
    <article className="group border-foreground/10 border-b py-10 sm:py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[64px_minmax(0,1fr)_320px] lg:gap-12">
        {/* Index */}
        <div className="hidden lg:block">
          <span className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Main content */}
        <div className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-5">
            <div className="flex items-center gap-4">
              <span className="text-muted text-[9px] font-medium tracking-[0.2em] uppercase lg:hidden">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h2 className="font-serif text-4xl leading-none tracking-[-0.035em] sm:text-5xl">
                {lead.name || 'Unnamed enquiry'}
              </h2>
            </div>

            <time
              dateTime={lead.created_at}
              className="text-muted text-[9px] font-medium tracking-[0.18em] uppercase sm:text-[10px]"
            >
              {formattedDate}
            </time>
          </div>

          {/* Service */}
          {lead.service && (
            <div className="mt-7 flex items-center gap-3">
              <span className="bg-foreground/30 h-px w-5" />

              <span className="text-secondary text-[10px] font-medium tracking-[0.2em] uppercase">
                {lead.service}
              </span>
            </div>
          )}

          {/* Message */}
          {lead.message && (
            <div className="mt-8 max-w-3xl">
              <p className="text-secondary text-sm leading-7 sm:text-base sm:leading-8">
                {lead.message}
              </p>
            </div>
          )}

          {/* Project details */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {formattedProjectDate && (
              <Detail icon={CalendarDays} label="Project date" value={formattedProjectDate} />
            )}

            {lead.location && <Detail icon={MapPin} label="Location" value={lead.location} />}

            {lead.budget && <Detail icon={Wallet} label="Budget" value={lead.budget} />}
          </div>
        </div>

        {/* Contact panel */}
        <div className="border-foreground/10 border-t pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <p className="text-muted mb-6 text-[9px] font-medium tracking-[0.24em] uppercase">
            Contact
          </p>

          <div className="flex flex-col gap-5">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="group/contact text-secondary hover:text-foreground flex min-w-0 items-start gap-3 text-sm transition-colors"
              >
                <Mail size={15} strokeWidth={1.3} className="text-muted mt-0.5 shrink-0" />

                <span className="min-w-0 break-all">{lead.email}</span>

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                  className="ml-auto shrink-0 opacity-0 transition-all duration-300 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5 group-hover/contact:opacity-100"
                />
              </a>
            )}

            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="group/contact text-secondary hover:text-foreground flex items-center gap-3 text-sm transition-colors"
              >
                <Phone size={15} strokeWidth={1.3} className="text-muted shrink-0" />

                <span>{lead.phone}</span>

                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                  className="ml-auto opacity-0 transition-all duration-300 group-hover/contact:translate-x-0.5 group-hover/contact:-translate-y-0.5 group-hover/contact:opacity-100"
                />
              </a>
            )}
          </div>

          {!lead.email && !lead.phone && (
            <p className="text-muted text-sm leading-7">No contact details provided.</p>
          )}
        </div>
      </div>
    </article>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <Icon size={14} strokeWidth={1.3} className="text-muted mt-0.5 shrink-0" />

      <div className="min-w-0">
        <p className="text-muted text-[8px] font-medium tracking-[0.2em] uppercase sm:text-[9px]">
          {label}
        </p>

        <p className="text-secondary mt-1.5 truncate text-xs sm:text-sm">{value}</p>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[480px] flex-col items-center justify-center py-24 text-center sm:min-h-[560px]">
      <div className="border-foreground/15 flex h-14 w-14 items-center justify-center rounded-full border">
        <UserRound size={21} strokeWidth={1.2} className="text-muted" />
      </div>

      <h2 className="mt-8 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
        No leads yet.
      </h2>

      <p className="text-secondary mx-auto mt-5 max-w-sm text-sm leading-7">
        New enquiries submitted through the ST Photography website will appear here automatically.
      </p>

      <Link
        href="/"
        className="group border-foreground/30 hover:border-foreground mt-9 inline-flex items-center gap-3 border-b pb-2 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors sm:text-xs"
      >
        View website
        <ArrowUpRight
          size={14}
          strokeWidth={1.3}
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </Link>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatProjectDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
