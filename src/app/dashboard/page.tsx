import { PageHero } from "@/components/page-shell";
import { TrendChart } from "@/components/trend-chart";
import { trendData } from "@/lib/content";
import { getMortalityRate, getSourceFreshness } from "@/lib/risk";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus trend dashboard",
  description: "Charts for infections, deaths, countries, mortality rate, comparisons, and source freshness.",
  path: "/dashboard",
});

export default function Page() {
  const totals = trendData.reduce(
    (acc, point) => ({
      infections: acc.infections + point.infections,
      deaths: acc.deaths + point.deaths,
      countries: Math.max(acc.countries, point.countries),
    }),
    { infections: 0, deaths: 0, countries: 0 },
  );
  const freshness = getSourceFreshness("2024-12-01", new Date("2026-05-07T00:00:00Z"));

  return (
    <>
      <PageHero
        eyebrow="Trend dashboard"
        title="Cases, deaths, countries, and mortality context."
        description="Charts show surveillance trend context and label source freshness so older official data is not mistaken for live case counts."
      />
      <section className="px-5 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            <Stat label="Infections in chart" value={totals.infections.toLocaleString()} />
            <Stat label="Deaths in chart" value={totals.deaths.toLocaleString()} />
            <Stat label="Max countries" value={totals.countries.toLocaleString()} />
            <Stat label="Chart mortality" value={`${getMortalityRate(totals.deaths, totals.infections)}%`} />
          </div>
          <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6">
            <TrendChart data={trendData} />
          </div>
          <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <p className="font-semibold">Source freshness: {freshness.label}</p>
            <p className="mt-2 text-sm leading-6">
              Official surveillance data can lag behind recent headlines. Always check the
              source date before interpreting a trend.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <p className="text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
