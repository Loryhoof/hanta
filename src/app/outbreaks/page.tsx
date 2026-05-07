import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { RiskBadge } from "@/components/risk-badge";
import { SourceLink } from "@/components/source-link";
import { outbreaks } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Regional hantavirus outbreaks",
  description: "Regional outbreak and watch pages with source-linked evidence labels.",
  path: "/outbreaks",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Regional outbreaks"
        title="Official clusters and regional watch pages."
        description="Each outbreak page separates confirmed cases from ecological and climate indicators."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-5">
          {outbreaks.map((region) => (
            <Link
              key={region.slug}
              href={`/outbreaks/${region.slug}`}
              className="rounded-3xl border border-slate-200 bg-white p-7 hover:border-teal-700"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-950">{region.name}</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{region.location}</p>
                </div>
                <RiskBadge level={region.riskLevel} />
              </div>
              <p className="mt-4 leading-7 text-slate-700">{region.summary}</p>
              <div className="mt-5">
                <SourceLink name={region.source} url={region.sourceUrl} date={region.lastUpdated} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
