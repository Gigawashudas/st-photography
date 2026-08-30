import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
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
function getWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('880')) {
    return digits;
  }
  if (digits.startsWith('01') && digits.length === 11) {
    return `88${digits}`;
  }
  if (digits.startsWith('1') && digits.length === 10) {
    return `880${digits}`;
  }
  return digits;
}
function getWhatsAppLink(lead: Enquiry) {
  if (!lead.phone) {
    return null;
  }
  const phoneNumber = getWhatsAppNumber(lead.phone);
  if (!phoneNumber) {
    return null;
  }
  const clientName = lead.name || 'there';
  const service = lead.service || 'your project';
  const message =
    `Hello ${clientName}, this is ST Photography. ` +
    `Thank you for your enquiry regarding ${service}. ` +
    `We would love to discuss your project with you. ` +
    `Please let us know a convenient time to talk.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
export default async function AdminLeadsPage() {
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user) {
    redirect('/admin/login');
  }
  const supabase = createAdminClient();
  const { data: enquiries, error } = await supabase
    .from('enquiries')
    .select('id, name, email, phone, service, project_date, location, budget, message, created_at')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Failed to load enquiries:', error);
    throw new Error(`Failed to load enquiries: ${error.message}`);
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
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            {' '}
            <div>
              {' '}
              <h1 className="font-serif text-[clamp(4rem,9vw,9rem)] leading-[0.8] tracking-[-0.05em]">
                {' '}
                Leads.{' '}
              </h1>{' '}
              <p className="text-secondary mt-8 max-w-xl text-sm leading-7">
                {' '}
                Review incoming enquiries, understand project requirements, and follow up with
                potential clients.{' '}
              </p>{' '}
            </div>{' '}
            <div className="flex items-baseline gap-3">
              {' '}
              <span className="font-serif text-6xl leading-none tracking-[-0.04em] sm:text-7xl">
                {' '}
                {leads.length}{' '}
              </span>{' '}
              <span className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                {' '}
                {leads.length === 1 ? 'Lead' : 'Leads'}{' '}
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
              <Link
                href="/#contact"
                className="group border-foreground/30 hover:border-foreground mt-8 inline-flex items-center gap-3 border-b pb-2 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors"
              >
                {' '}
                View contact form{' '}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />{' '}
              </Link>{' '}
            </div>
          ) : (
            <div>
              {' '}
              {leads.map((lead, index) => {
                const whatsappLink = getWhatsAppLink(lead);
                return (
                  <article
                    key={lead.id}
                    className="border-foreground/10 border-b py-10 sm:py-12 lg:py-14"
                  >
                    {' '}
                    <div className="grid gap-10 lg:grid-cols-[72px_1fr_300px] lg:gap-12">
                      {' '}
                      <div className="text-muted text-[10px] font-medium tracking-[0.2em] uppercase">
                        {' '}
                        {String(index + 1).padStart(2, '0')}{' '}
                      </div>{' '}
                      <div className="min-w-0">
                        {' '}
                        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
                          {' '}
                          <h2 className="font-serif text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
                            {' '}
                            {lead.name || 'Unnamed enquiry'}{' '}
                          </h2>{' '}
                          {lead.service && (
                            <span className="border-foreground/15 text-muted w-fit border px-3 py-1.5 text-[9px] font-medium tracking-[0.18em] uppercase">
                              {' '}
                              {lead.service}{' '}
                            </span>
                          )}{' '}
                        </div>{' '}
                        <div className="text-muted mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-medium tracking-[0.18em] uppercase">
                          {' '}
                          <time dateTime={lead.created_at}>
                            {' '}
                            {new Date(lead.created_at).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                          </time>{' '}
                          <span>•</span>{' '}
                          <time dateTime={lead.created_at}>
                            {' '}
                            {new Date(lead.created_at).toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                          </time>{' '}
                        </div>{' '}
                        {lead.message && (
                          <div className="border-foreground/15 mt-8 border-l pl-5 sm:mt-10 sm:pl-6">
                            {' '}
                            <p className="text-secondary max-w-2xl text-sm leading-7 whitespace-pre-wrap sm:text-base sm:leading-8">
                              {' '}
                              {lead.message}{' '}
                            </p>{' '}
                          </div>
                        )}{' '}
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 lg:hidden">
                          {' '}
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-secondary hover:text-foreground flex min-w-0 items-center gap-3 text-sm transition-colors"
                            >
                              {' '}
                              <Mail
                                size={15}
                                strokeWidth={1.3}
                                className="text-muted shrink-0"
                              />{' '}
                              <span className="truncate">{lead.email}</span>{' '}
                            </a>
                          )}{' '}
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-secondary hover:text-foreground flex items-center gap-3 text-sm transition-colors"
                            >
                              {' '}
                              <Phone
                                size={15}
                                strokeWidth={1.3}
                                className="text-muted shrink-0"
                              />{' '}
                              <span>{lead.phone}</span>{' '}
                            </a>
                          )}{' '}
                        </div>{' '}
                      </div>{' '}
                      <aside className="border-foreground/10 flex flex-col gap-6 border-t pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
                        {' '}
                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-secondary hover:text-foreground flex min-w-0 items-start gap-3 text-sm transition-colors"
                          >
                            {' '}
                            <Mail
                              size={15}
                              strokeWidth={1.3}
                              className="text-muted mt-0.5 shrink-0"
                            />{' '}
                            <span className="min-w-0 break-all">{lead.email}</span>{' '}
                          </a>
                        )}{' '}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-secondary hover:text-foreground flex items-start gap-3 text-sm transition-colors"
                          >
                            {' '}
                            <Phone
                              size={15}
                              strokeWidth={1.3}
                              className="text-muted mt-0.5 shrink-0"
                            />{' '}
                            <span>{lead.phone}</span>{' '}
                          </a>
                        )}{' '}
                        {lead.project_date && (
                          <div className="text-secondary flex items-start gap-3 text-sm">
                            {' '}
                            <CalendarDays
                              size={15}
                              strokeWidth={1.3}
                              className="text-muted mt-0.5 shrink-0"
                            />{' '}
                            <div>
                              {' '}
                              <p className="text-muted mb-1 text-[9px] font-medium tracking-[0.18em] uppercase">
                                {' '}
                                Project date{' '}
                              </p>{' '}
                              <p>
                                {' '}
                                {new Date(`${lead.project_date}T00:00:00`).toLocaleDateString(
                                  'en-GB',
                                  { day: '2-digit', month: 'short', year: 'numeric' },
                                )}{' '}
                              </p>{' '}
                            </div>{' '}
                          </div>
                        )}{' '}
                        {lead.location && (
                          <div className="text-secondary flex items-start gap-3 text-sm">
                            {' '}
                            <MapPin
                              size={15}
                              strokeWidth={1.3}
                              className="text-muted mt-0.5 shrink-0"
                            />{' '}
                            <div>
                              {' '}
                              <p className="text-muted mb-1 text-[9px] font-medium tracking-[0.18em] uppercase">
                                {' '}
                                Location{' '}
                              </p>{' '}
                              <p>{lead.location}</p>{' '}
                            </div>{' '}
                          </div>
                        )}{' '}
                        {lead.budget && (
                          <div className="border-foreground/10 border-t pt-5">
                            {' '}
                            <p className="text-muted mb-1 text-[9px] font-medium tracking-[0.18em] uppercase">
                              {' '}
                              Budget{' '}
                            </p>{' '}
                            <p className="text-secondary text-sm">{lead.budget}</p>{' '}
                          </div>
                        )}{' '}
                        <div className="mt-auto flex flex-wrap items-center gap-5 pt-2">
                          {' '}
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ST Photography enquiry — ${lead.service || 'Project'}`)}`}
                              className="group border-foreground/30 hover:border-foreground inline-flex min-h-10 items-center gap-3 border-b pb-2 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors"
                            >
                              {' '}
                              Email Reply{' '}
                              <ArrowUpRight
                                size={14}
                                strokeWidth={1.3}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                              />{' '}
                            </a>
                          )}{' '}
                          {whatsappLink && (
                            <a
                              href={whatsappLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group border-foreground/30 hover:border-foreground inline-flex min-h-10 items-center gap-3 border-b pb-2 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors"
                            >
                              {' '}
                              WhatsApp Reply{' '}
                              <ArrowUpRight
                                size={14}
                                strokeWidth={1.3}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                              />{' '}
                            </a>
                          )}{' '}
                        </div>{' '}
                      </aside>{' '}
                    </div>{' '}
                  </article>
                );
              })}{' '}
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
