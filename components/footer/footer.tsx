import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
    <footer className="border-foreground/10 bg-background border-t px-6 pt-20 pb-8 sm:px-8 sm:pt-24 lg:px-10 lg:pt-28">
      {' '}
      <div className="mx-auto max-w-360">
        {' '}
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-5 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-x-16">
          {' '}
          {/* Brand */}{' '}
          <div className="col-span-2 sm:col-span-1">
            {' '}
            <Link
              href="/"
              className="inline-block font-serif text-5xl tracking-[-0.06em] transition-opacity duration-300 hover:opacity-50 sm:text-6xl"
            >
              {' '}
              ST{' '}
            </Link>{' '}
            <p className="text-secondary mt-6 max-w-55 text-sm leading-6">
              {' '}
              Photography &amp; Cinematography{' '}
            </p>{' '}
          </div>{' '}
          {/* Explore */}{' '}
          <div>
            {' '}
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              {' '}
              Explore{' '}
            </p>{' '}
            <nav className="flex flex-col items-start gap-3">
              {' '}
              <Link
                href="/"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Home{' '}
              </Link>{' '}
              <Link
                href="/work"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Work{' '}
              </Link>{' '}
              <Link
                href="/about"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                About{' '}
              </Link>{' '}
              <Link
                href="/contact"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Contact{' '}
              </Link>{' '}
            </nav>{' '}
          </div>{' '}
          {/* Services */}{' '}
          <div>
            {' '}
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              {' '}
              Services{' '}
            </p>{' '}
            <nav className="flex flex-col items-start gap-3">
              {' '}
              <Link
                href="/contact?service=Photography"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Photography{' '}
              </Link>{' '}
              <Link
                href="/contact?service=Cinematography"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Cinematography{' '}
              </Link>{' '}
              <Link
                href="/contact?service=Event"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Events{' '}
              </Link>{' '}
              <Link
                href="/contact?service=Portrait"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Portraits{' '}
              </Link>{' '}
              <Link
                href="/contact?service=Interior"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Interior{' '}
              </Link>{' '}
            </nav>{' '}
          </div>{' '}
          {/* Connect */}{' '}
          <div>
            {' '}
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              {' '}
              Connect{' '}
            </p>{' '}
            <nav className="flex flex-col items-start gap-3">
              {' '}
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-foreground inline-flex items-center gap-1.5 text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Instagram{' '}
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />{' '}
              </a>{' '}
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-foreground inline-flex items-center gap-1.5 text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                YouTube{' '}
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />{' '}
              </a>{' '}
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-foreground inline-flex items-center gap-1.5 text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                Facebook{' '}
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />{' '}
              </a>{' '}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-foreground inline-flex items-center gap-1.5 text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                WhatsApp{' '}
                <ArrowUpRight
                  size={12}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />{' '}
              </a>{' '}
            </nav>{' '}
          </div>{' '}
          {/* Contact */}{' '}
          <div className="col-span-2 sm:col-span-1">
            {' '}
            <p className="text-muted mb-5 text-[10px] font-medium tracking-[0.22em] uppercase sm:text-[11px]">
              {' '}
              Contact{' '}
            </p>{' '}
            <div className="flex flex-col items-start gap-5">
              {' '}
              <a
                href="mailto:sahatammalphotography@gmail.com"
                className="group border-foreground/30 hover:border-foreground inline-flex max-w-full items-center gap-3 border-b pb-2 text-sm tracking-[0.02em] transition-colors duration-300 sm:text-base"
              >
                {' '}
                <span className="break-all"> sahatammalphotography@gmail.com </span>{' '}
                <ArrowUpRight
                  size={15}
                  strokeWidth={1.3}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />{' '}
              </a>{' '}
              <a
                href="tel:+8801839050341"
                className="text-foreground text-sm transition-opacity duration-300 hover:opacity-50"
              >
                {' '}
                +880 1839 050341{' '}
              </a>{' '}
              <Link
                href="/contact"
                className="group border-foreground/30 hover:border-foreground mt-3 inline-flex items-center gap-2 border-b pb-2 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 sm:text-[11px]"
              >
                {' '}
                Start a Project{' '}
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.3}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />{' '}
              </Link>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
        {/* Bottom */}{' '}
        <div className="border-foreground/10 mt-20 border-t pt-6 sm:mt-24 sm:pt-8 lg:mt-28">
          {' '}
          <div className="text-muted flex flex-col gap-4 text-[10px] tracking-[0.18em] uppercase sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
            {' '}
            <p>© {new Date().getFullYear()} ST Photography</p>{' '}
            <p>Photography &amp; Cinematography</p>{' '}
            <a href="#" className="transition-opacity duration-300 hover:opacity-50">
              {' '}
              Back to top ↑{' '}
            </a>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </footer>
  );
}
