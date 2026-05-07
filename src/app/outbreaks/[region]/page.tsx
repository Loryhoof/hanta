import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-shell";
import { RiskBadge } from "@/components/risk-badge";
import { SourceLink } from "@/components/source-link";
import { outbreaks } from "@/lib/content";
import { breadcrumbJsonLd, medicalWebPageJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ region: string }> };

export function generateStaticParams() {
  return outbreaks.map((region) => ({ region: region.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { region: slug } = await params;
  const region = outbreaks.find((item) => item.slug === slug);

  if (!region) return {};

  return pageMetadata({
    title: `${region.name} hantavirus outbreak status`,
    description: region.summary,
    path: `/outbreaks/${region.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { region: slug } = await params;
  const region = outbreaks.find((item) => item.slug === slug);

  if (!region) notFound();

  return (
    <>
      <JsonLd
        data={medicalWebPageJsonLd({
          title: `${region.name} hantavirus outbreak status`,
          description: region.summary,
          path: `/outbreaks/${region.slug}`,
          reviewedAt: region.lastUpdated,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Outbreaks", path: "/outbreaks" },
          { name: region.name, path: `/outbreaks/${region.slug}` },
        ])}
      />
      <PageHero eyebrow="Outbreak status" title={region.name} description={region.summary} />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-slate-200 bg-white p-8">
            <RiskBadge level={region.riskLevel} />
            <h2 className="mt-5 text-3xl font-black text-slate-950">Evidence summary</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{region.summary}</p>
            <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Counts and risk labels are shown with source dates. This information is not a
              substitute for medical advice or local public health guidance.
            </p>
          </article>
          <aside className="rounded-3xl border border-slate-200 bg-white p-6">
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Location</dt>
                <dd className="mt-1 font-bold text-slate-950">{region.location}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Cases</dt>
                <dd className="mt-1 font-bold text-slate-950">{region.cases ?? "Not published here"}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Deaths</dt>
                <dd className="mt-1 font-bold text-slate-950">{region.deaths ?? "Not published here"}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <SourceLink name={region.source} url={region.sourceUrl} date={region.lastUpdated} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
