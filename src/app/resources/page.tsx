import { PageHero } from "@/components/page-shell";
import { SourceLink } from "@/components/source-link";
import { sourceDirectory } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus resources and source directory",
  description: "Official data, health guidance, climate, and ecology sources used for public context.",
  path: "/resources",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Source directory."
        description="Official and peer-reviewed sources come first, with news and environmental indicators kept clearly labeled."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {sourceDirectory.map((source) => (
            <article key={source.url} className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">
                {source.agency} · priority {source.priority}
              </p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">{source.name}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">Cadence: {source.cadence}</p>
              <div className="mt-5">
                <SourceLink name={source.name} url={source.url} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
