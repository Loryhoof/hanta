import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { SourceLink } from "@/components/source-link";
import { outbreaks, trendData } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus case statistics",
  description: "Source-labeled case statistics and surveillance context for hantavirus.",
  path: "/case-statistics",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Case statistics"
        title="Numbers with dates, sources, and caveats."
        description="Official surveillance numbers often lag developing news, so this page keeps source labels and freshness visible."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="p-4">Year</th>
                  <th className="p-4">Infections</th>
                  <th className="p-4">Deaths</th>
                  <th className="p-4">Geography</th>
                  <th className="p-4">Source</th>
                </tr>
              </thead>
              <tbody>
                {trendData.map((point) => (
                  <tr key={point.year} className="border-t border-slate-100">
                    <td className="p-4 font-semibold">{point.year}</td>
                    <td className="p-4">{point.infections.toLocaleString()}</td>
                    <td className="p-4">{point.deaths === null ? "Not reported" : point.deaths.toLocaleString()}</td>
                    <td className="p-4">{point.geography}</td>
                    <td className="p-4">
                      <a className="text-teal-800 underline-offset-4 hover:underline" href={point.sourceUrl}>
                        {point.sourceName}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className="grid content-start gap-4">
            {outbreaks.map((region) => (
              <Link
                key={region.slug}
                href={`/outbreaks/${region.slug}`}
                className="rounded-3xl border border-slate-200 bg-white p-5 hover:border-teal-700"
              >
                <h2 className="text-xl font-black text-slate-950">{region.name}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{region.summary}</p>
              </Link>
            ))}
            <SourceLink
              name="CDC reported cases"
              url="https://www.cdc.gov/hantavirus/data-research/cases/index.html"
            />
          </aside>
        </div>
      </section>
    </>
  );
}
