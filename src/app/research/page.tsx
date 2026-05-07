import { PageHero } from "@/components/page-shell";
import { SourceLink } from "@/components/source-link";
import { researchPapers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus research papers and resources",
  description: "Research and official resources with plain-language summaries and source links.",
  path: "/research",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Papers, toolboxes, and technical references."
        description="Plain-language summaries of official resources and technical references, with links back to the original sources."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-5xl gap-5">
          {researchPapers.map((paper) => (
            <article key={paper.url} className="rounded-3xl border border-slate-200 bg-white p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">
                {paper.source}
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-950">{paper.title}</h2>
              <p className="mt-3 leading-7 text-slate-700">{paper.summary}</p>
              <div className="mt-5">
                <SourceLink name={paper.source} url={paper.url} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
