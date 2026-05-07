import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { SourceLink } from "@/components/source-link";
import { getNewsArticles } from "@/lib/news";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 1800;

export const metadata = pageMetadata({
  title: "Hantavirus news feed",
  description: "Recent hantavirus updates from public health agencies and reputable news sources.",
  path: "/news",
});

export default async function Page() {
  const articles = await getNewsArticles();

  return (
    <>
      <PageHero
        eyebrow="News feed"
        title="Latest hantavirus updates."
        description="Recent updates from public health agencies and reputable news sources, with publication dates and links to the original source."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-5xl gap-5">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-teal-700"
            >
              <Link href={`/news/${article.slug}`} className="block">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-teal-800">
                  {article.eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-950">{article.title}</h2>
                <p className="mt-3 leading-7 text-slate-700">{article.summary}</p>
                <p className="mt-4 text-sm font-semibold text-teal-900">
                  Read source summary and key points
                </p>
              </Link>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <SourceLink name={article.sourceName} url={article.sourceUrl} date={article.publishedAt} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
