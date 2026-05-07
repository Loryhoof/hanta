import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-shell";
import { SourceLink } from "@/components/source-link";
import { clinicalTopics } from "@/lib/content";
import { medicalWebPageJsonLd } from "@/lib/seo";

export function TopicPage({ slug }: { slug: keyof typeof clinicalTopics }) {
  const topic = clinicalTopics[slug];

  return (
    <>
      <JsonLd
        data={medicalWebPageJsonLd({
          title: topic.title,
          description: topic.description,
          path: `/${slug}`,
          reviewedAt: "2026-05-07",
        })}
      />
      <PageHero eyebrow="Health information" title={topic.title} description={topic.description} />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-5xl gap-6">
          {topic.sections.map((section) => (
            <article key={section.heading} className="rounded-3xl border border-slate-200 bg-white p-7">
              <h2 className="text-3xl font-black text-slate-950">{section.heading}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">{section.body}</p>
            </article>
          ))}
          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <h2 className="text-2xl font-black">Important care note</h2>
            <p className="mt-3 leading-7 text-slate-200">
              This page is public health information, not diagnosis or individualized medical
              advice. If symptoms follow possible rodent exposure, contact a clinician or local
              health authority promptly.
            </p>
            <div className="mt-5">
              <SourceLink name="CDC hantavirus guidance" url="https://www.cdc.gov/hantavirus/" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
