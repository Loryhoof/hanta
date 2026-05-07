import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-shell";
import { RiskBadge } from "@/components/risk-badge";
import { SourceLink } from "@/components/source-link";
import { locationPages } from "@/lib/content";
import { breadcrumbJsonLd, medicalWebPageJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = locationPages.find((item) => item.slug === slug);

  if (!page) return {};

  return pageMetadata({
    title: page.title,
    description: page.summary,
    path: `/locations/${page.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = locationPages.find((item) => item.slug === slug);

  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={medicalWebPageJsonLd({
          title: page.title,
          description: page.summary,
          path: `/locations/${page.slug}`,
          reviewedAt: page.lastReviewed,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: page.title, path: `/locations/${page.slug}` },
        ])}
      />
      <PageHero eyebrow="Localized SEO" title={page.title} description={page.question} />
      <section className="px-5 py-14">
        <article className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8">
          <RiskBadge level={page.riskLevel} />
          <h2 className="mt-5 text-3xl font-black text-slate-950">Current source-linked answer</h2>
          <p className="mt-4 text-lg leading-8 text-slate-700">{page.summary}</p>
          <h2 className="mt-8 text-2xl font-black text-slate-950">Prevention note</h2>
          <p className="mt-3 leading-7 text-slate-700">{page.preventionNote}</p>
          <div className="mt-6">
            <SourceLink name="Primary source" url={page.sourceUrl} date={page.lastReviewed} />
          </div>
        </article>
      </section>
    </>
  );
}
