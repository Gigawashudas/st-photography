import Link from 'next/link';

const instagramLink = 'https://www.instagram.com/st_photography_interior?igsi=MTk4cHk4enJhNW50cg==';

const youtubeLink = 'https://youtube.com/@stphotography01?si=UuuBA6z8vunGAAD5';

const facebookLink = 'https://www.facebook.com/share/1EiPXQt7tZ/';

const whatsappNumber = '8801839050341';

const whatsappMessage =
  'Hello Sraban, I would like to discuss a photography or cinematography project with ST Photography.';

const whatsappLink =
  'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage);

export function Footer() {
  return (
    <footer className="border-foreground/10 bg-background border-t px-6 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-360">
        <div className="relative grid grid-cols-2 gap-x-8 gap-y-14 px-3 pb-20 sm:grid-cols-5 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-x-16">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="inline-block text-5xl font-medium tracking-[-0.06em] transition-opacity duration-300 hover:opacity-50 sm:text-6xl"
            >
              ST
            </Link>

            <p className="text-secondary mt-6 max-w-55 text-sm leading-6">
              Photography &amp; Cinematography
            </p>
          </div>

          <div>
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              Explore
            </p>

            <nav className="flex flex-col items-start gap-3">
              <Link
                href="/"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                Home
              </Link>

              <Link
                href="/work"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                Work
              </Link>

              <Link
                href="/about"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              Services
            </p>

            <nav className="flex flex-col items-start gap-3">
              <Link
                href="/contact?service=Photography"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                Interior Photography
              </Link>

              <Link
                href="/contact?service=Cinematography"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                Interior Cinematography
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              Contact
            </p>

            <div className="flex flex-col items-start gap-5">
              <a
                href="mailto:sahatammalphotography@gmail.com"
                className="border-foreground/30 hover:border-foreground inline-flex max-w-full border-b pb-2 text-sm tracking-[0.02em] transition-colors duration-300 sm:text-base"
              >
                <span className="break-all">sahatammalphotography@gmail.com</span>
              </a>

              <a
                href="tel:+8801839050341"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                +880 1839 050341
              </a>

              <Link
                href="/contact"
                className="border-foreground/30 hover:border-foreground mt-3 inline-flex items-center border-b pb-2 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 sm:text-[11px]"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <nav
            aria-label="Social media"
            className="col-span-2 mt-2 flex items-end justify-start gap-5 sm:col-span-5 sm:justify-start sm:pb-5 lg:absolute lg:right-0 lg:bottom-0 lg:col-span-1 lg:mt-0 lg:justify-end"
          >
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-foreground transition-opacity duration-300 hover:opacity-50"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
              </svg>
            </a>

            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-foreground transition-opacity duration-300 hover:opacity-50"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
              </svg>
            </a>

            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-foreground transition-opacity duration-300 hover:opacity-50"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M14 8h3V4.5c-.52-.07-1.87-.18-3.55-.18-3.51 0-5.92 2.14-5.92 6.08V14H4v3.9h3.53V24h4.33v-6.1h3.59l.57-3.9h-4.16v-3.25c0-1.13.31-1.9 2.14-1.9Z" />
              </svg>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-foreground transition-opacity duration-300 hover:opacity-50"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M20.5 3.5A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.59 5.96L.12 24l6.3-1.65a11.86 11.86 0 0 0 5.68 1.45h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.49-8.42Z" />
                <path d="M8.7 6.9c-.24-.54-.5-.55-.73-.56h-.62c-.22 0-.57.08-.87.4-.3.33-1.14 1.12-1.14 2.74s1.17 3.18 1.34 3.4c.16.22 2.26 3.63 5.54 4.94 2.74 1.1 3.3.88 3.9.82.59-.05 1.91-.78 2.18-1.53.27-.75.27-1.39.19-1.53-.08-.14-.3-.22-.62-.38-.33-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.22.33-.84 1.05-1.03 1.27-.19.22-.38.25-.7.08-.33-.16-1.37-.5-2.61-1.58-.97-.87-1.62-1.94-1.81-2.27-.19-.33-.02-.5.14-.67.14-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57Z" />
              </svg>
            </a>
          </nav>
        </div>

        <div className="border-foreground/10 border-t pt-6 sm:pt-8">
          <div className="text-muted flex flex-col gap-4 text-[10px] tracking-[0.18em] uppercase sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
            <p>© {new Date().getFullYear()} ST Photography</p>

            <p>Photography &amp; Cinematography</p>

            <a href="#" className="transition-opacity duration-300 hover:opacity-50">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
