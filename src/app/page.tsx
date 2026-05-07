import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RiskBadge } from "@/components/risk-badge";
import { RiskMap } from "@/components/risk-map";
import { SourceLink } from "@/components/source-link";
import { TrendChart } from "@/components/trend-chart";
import {
  globalStatus,
  outbreaks,
  preventionSteps,
  trendData,
} from "@/lib/content";
import { getNewsArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";
import { sourceDisclaimer } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Hantavirus outbreak status, prevention, risk map, and case trends",
  description:
    "Hantavirus prevention information with outbreak updates, risk maps, trend charts, news, and research.",
  path: "/",
});

export default async function Home() {
  const articles = await getNewsArticles();

  return (
    <>
      <section className="relative overflow-hidden bg-[#f8f5ee] px-5 py-16 md:py-24">
        <div className="absolute inset-0 medical-grid opacity-70" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-teal-700/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-teal-800">
              Hantavirus information and outbreak updates
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
              Hantavirus prevention, symptoms, and current outbreak reports.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Clear information on how hantavirus spreads, how to reduce exposure to rodents,
              where official sources report activity, and how recent updates are changing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/map"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-900"
              >
                Open risk map
              </Link>
              <Link
                href="/prevention"
                className="rounded-full border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 hover:border-teal-800"
              >
                Prevention basics
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-xl shadow-teal-950/5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">{globalStatus.label}</p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">Current situation</h2>
              </div>
              <RiskBadge level={globalStatus.level} />
            </div>
            <p className="mt-5 text-base leading-7 text-slate-700">
              {globalStatus.latestVerifiedUpdate}
            </p>
            <SourceLink
              name={globalStatus.sourceName}
              url={globalStatus.sourceUrl}
              date={globalStatus.updatedAt}
            />
            <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
              {sourceDisclaimer}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-800">
              Interactive risk map
            </p>
            <h2 className="mt-3 text-4xl font-black text-slate-950">Reported outbreaks and regional context.</h2>
            <p className="mt-4 leading-7 text-slate-700">
              The map shows reported outbreak areas, case data, rodent ecology, and climate
              context as separate layers so readers can distinguish confirmed events from
              environmental background.
            </p>
            <Link
              href="/map"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-900"
            >
              Explore map <ArrowRight size={16} />
            </Link>
          </div>
          <RiskMap regions={outbreaks} />
        </div>
      </section>

      <section className="bg-white px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-[#fffdf8] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-800">
                  Trend dashboard
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">
                  Cases, deaths, countries, and mortality rate.
                </h2>
              </div>
              <Link href="/dashboard" className="text-sm font-bold text-teal-900">
                Full dashboard
              </Link>
            </div>
            <TrendChart data={trendData} />
          </div>
          <div className="grid gap-4">
            <h2 className="text-3xl font-black text-slate-950">Prevention basics</h2>
            {preventionSteps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-[#fffdf8] p-5">
                <p className="text-sm font-black text-teal-800">0{index + 1}</p>
                <p className="mt-2 font-semibold leading-7 text-slate-800">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-teal-800">
                Recent news
              </p>
              <h2 className="mt-2 text-4xl font-black text-slate-950">Latest hantavirus updates</h2>
            </div>
            <Link href="/news" className="text-sm font-bold text-teal-900">
              All news
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/news/${article.slug}`}
                className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-teal-700"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">
                  {article.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">{article.title}</h3>
                <p className="mt-3 leading-7 text-slate-700">{article.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
