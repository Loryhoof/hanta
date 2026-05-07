import { PageHero } from "@/components/page-shell";
import { trendData } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus deaths",
  description: "Deaths and mortality context with source labels and public-health caveats.",
  path: "/deaths",
});

export default function Page() {
  const deaths = trendData.reduce((sum, point) => sum + point.deaths, 0);

  return (
    <>
      <PageHero
        eyebrow="Mortality"
        title="Deaths and mortality context."
        description="Death counts are shown with source, geography, case definition, and reporting date where available."
      />
      <section className="px-5 py-14">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8">
          <p className="text-6xl font-black text-slate-950">{deaths.toLocaleString()}</p>
          <p className="mt-3 text-lg leading-8 text-slate-700">
            Death counts are most useful when read alongside the source, geography, case
            definition, and reporting date behind them.
          </p>
        </div>
      </section>
    </>
  );
}
