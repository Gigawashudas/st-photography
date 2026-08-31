import Link from 'next/link';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { ContactSection } from '@/components/contact/contact-section';
import { Footer } from '@/components/footer/footer';

const whatsappNumber = '8801839050341';

const whatsappMessage =
  'Hello Sraban, I would like to discuss a photography or cinematography project with ST Photography.';

const whatsappLink =
  'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);

const emailAddress = 'sahatammalphotography@gmail.com';

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="px-5 pt-36 pb-24 sm:px-8 sm:pt-44 sm:pb-32 lg:px-10 lg:pt-48 lg:pb-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="min-h-[70vh]">
            <div className="mb-8 flex items-center gap-4 sm:mb-10">
              <span className="bg-foreground/40 h-px w-8" />

              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                03 / Contact
              </p>
            </div>

            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
              <div>
                <h1 className="font-serif text-[clamp(4.5rem,13vw,12rem)] leading-[0.78] tracking-[-0.06em]">
                  Let&apos;s
                  <br />
                  create
                  <br />
                  <span className="text-secondary">something.</span>
                </h1>
              </div>

              <div className="flex flex-col justify-end lg:pt-48">
                <p className="text-secondary max-w-lg text-base leading-8 sm:text-lg sm:leading-9">
                  Have a project in mind? Tell us what you are planning, and we&apos;ll start a
                  conversation about how we can bring it to life.
                </p>

                <div className="mt-10 flex flex-col gap-5 sm:mt-14">
                  <a
                    href={'mailto:' + emailAddress}
                    className="group flex w-fit items-center gap-4 text-sm transition-opacity duration-300 hover:opacity-50 sm:text-base"
                  >
                    <Mail size={17} strokeWidth={1.3} className="text-muted" />

                    <span>{emailAddress}</span>

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.3}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit items-center gap-4 text-sm transition-opacity duration-300 hover:opacity-50 sm:text-base"
                  >
                    <MessageCircle size={17} strokeWidth={1.3} className="text-muted" />

                    <span>WhatsApp</span>

                    <ArrowUpRight
                      size={15}
                      strokeWidth={1.3}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-20 flex items-center gap-4 sm:mt-28">
              <span className="bg-foreground/20 h-px w-8" />

              <a
                href="#enquiry"
                className="group text-muted flex items-center gap-3 text-[10px] font-medium tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-50 sm:text-xs"
              >
                Send an enquiry
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="enquiry" className="border-foreground/10 border-t">
        <ContactSection />
      </section>

      <section className="border-foreground/10 border-t px-5 py-24 sm:px-8 sm:py-36 lg:px-10 lg:py-48">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                Direct
              </p>
            </div>

            <div>
              <h2 className="max-w-4xl font-serif text-[clamp(3.5rem,7vw,7rem)] leading-[0.84] tracking-[-0.05em]">
                Prefer a
                <br />
                <span className="text-secondary">conversation?</span>
              </h2>

              <p className="text-secondary mt-10 max-w-xl text-sm leading-8 sm:mt-14 sm:text-base sm:leading-9">
                For urgent bookings, availability checks, or if you simply prefer talking directly,
                reach us through WhatsApp or email.
              </p>

              <div className="mt-10 flex flex-col gap-5 sm:mt-14 sm:flex-row sm:gap-8">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-foreground inline-flex w-fit items-center gap-4 border-b pb-3 text-[10px] font-medium tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-50 sm:text-xs"
                >
                  WhatsApp
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.3}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href={'mailto:' + emailAddress}
                  className="group border-foreground/30 text-secondary hover:border-foreground hover:text-foreground inline-flex w-fit items-center gap-4 border-b pb-3 text-[10px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 sm:text-xs"
                >
                  Email
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.3}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-foreground/10 border-t px-5 py-24 sm:px-8 sm:py-36 lg:px-10 lg:py-48">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-muted text-[10px] font-medium tracking-[0.25em] uppercase sm:text-xs">
                More ST Photography
              </p>

              <h2 className="mt-6 font-serif text-5xl tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Explore the work.
              </h2>
            </div>

            <Link
              href="/work"
              className="group border-foreground flex w-fit items-center gap-4 border-b pb-3 text-[10px] font-medium tracking-[0.22em] uppercase transition-opacity duration-300 hover:opacity-50 sm:text-xs"
            >
              View work
              <ArrowUpRight
                size={15}
                strokeWidth={1.3}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
