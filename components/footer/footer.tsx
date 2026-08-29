import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const instagramLink = "https://www.instagram.com/st_photography_interior?igsi=MTk4cHk4enJhNW50cg==";

const youtubeLink = "https://youtube.com/@stphotography01?si=UuuBA6z8vunGAAD5";

const facebookLink = "https://www.facebook.com/share/1EiPXQt7tZ/";

const whatsappNumber = "8801839050341";

const whatsappMessage = "Hello Sraban, I would like to discuss a photography or cinematography project with ST Photography.";

const whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background px-6 pb-8 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-360">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-x-16">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="inline-block font-serif text-5xl tracking-[-0.06em] transition-opacity duration-300 hover:opacity-50 sm:text-6xl">
              ST
            </Link>

            <p className="mt-6 max-w-[220px] text-sm leading-6 text-secondary">Photography &amp; Cinematography</p>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">Explore</p>

            <nav className="flex flex-col items-start gap-3">
              <Link href="/" className="text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                Home
              </Link>

              <Link href="/work" className="text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                Work
              </Link>

              <Link href="/about" className="text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                About
              </Link>

              <Link href="/contact" className="text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">Connect</p>

            <nav className="flex flex-col items-start gap-3">
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                Instagram
                <ArrowUpRight size={12} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                YouTube
                <ArrowUpRight size={12} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                Facebook
                <ArrowUpRight size={12} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                WhatsApp
                <ArrowUpRight size={12} strokeWidth={1.3} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </nav>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[11px]">Contact</p>

            <div className="flex flex-col items-start gap-3">
              <a href="mailto:sahatammalphotography@gmail.com" className="text-sm leading-6 text-foreground transition-opacity duration-300 hover:opacity-50">
                sahatammalphotography
                <br />
                @gmail.com
              </a>

              <a href="tel:+8801839050341" className="text-sm text-foreground transition-opacity duration-300 hover:opacity-50">
                +880 1839 050341
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-foreground/10 pt-6 sm:mt-24 sm:pt-8 lg:mt-12">
          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
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
