import { PageHero } from "@/components/page-shell";
import { trendData } from "@/lib/content";
import { getMortalityRate } from "@/lib/risk";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus mortality rate",
  description: "Mortality-rate calculations with clear numerator, denominator, and source context.",
  path: "/mortality-rate",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Mortality rate"
        title="Show the denominator every time."
        description="A percentage is only meaningful when you can see the cases, deaths, source period, and reporting definition behind it."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-5xl gap-4">
          {trendData.map((point) => (
            <div
              key={point.year}
              className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-5 md:grid-cols-4"
            >
              <strong>{point.year}</strong>
              <span>{point.infections.toLocaleString()} infections</span>
              <span>{point.deaths.toLocaleString()} deaths</span>
              <span className="font-black text-teal-900">
                {getMortalityRate(point.deaths, point.infections)}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
