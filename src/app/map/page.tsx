import { PageHero } from "@/components/page-shell";
import { RiskBadge } from "@/components/risk-badge";
import { RiskMap } from "@/components/risk-map";
import { SourceLink } from "@/components/source-link";
import { outbreaks } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { sourceDisclaimer } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Interactive hantavirus risk map",
  description:
    "Map of reported hantavirus outbreak regions, case data, rodent ecology, and climate context.",
  path: "/map",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Risk map"
        title="Reported outbreaks and regional context."
        description="This map separates reported outbreak information from case data, rodent ecology, and climate context."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <RiskMap regions={outbreaks} />
            <p className="mt-4 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600">
              {sourceDisclaimer}
            </p>
          </div>
          <aside className="grid content-start gap-4">
            {outbreaks.map((region) => (
              <article key={region.slug} className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-black text-slate-950">{region.name}</h2>
                  <RiskBadge level={region.riskLevel} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{region.summary}</p>
                <div className="mt-4">
                  <SourceLink name={region.source} url={region.sourceUrl} date={region.lastUpdated} />
                </div>
              </article>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
