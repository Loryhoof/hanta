import Link from "next/link";
import { primaryNav, site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-[#f8f5ee]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="flex items-center">
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.18em] text-slate-950">
              Hantavirus
            </span>
            <span className="block text-xs font-semibold text-teal-900">Prevention.org</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-700 lg:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-teal-900">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/news"
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-900"
        >
          Latest updates
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-900/10 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Public health information about hantavirus prevention, symptoms, transmission,
            and reported outbreaks. Seek medical care for symptoms after possible exposure.
          </p>
        </div>
        <div>
          <p className="font-semibold">Tracking</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link href="/map">Risk map</Link>
            <Link href="/dashboard">Trend dashboard</Link>
            <Link href="/case-statistics">Case statistics</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Information</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-300">
            <Link href="/resources">Resources</Link>
            <Link href="/research">Research</Link>
            <Link href="/faq">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#f8f5ee] px-5 py-16 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,118,110,0.16),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(180,83,9,0.12),transparent_26%)]" />
      <div className="relative mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-teal-800">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{description}</p>
      </div>
    </section>
  );
}
