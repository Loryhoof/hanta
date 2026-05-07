import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-shell";
import { SourceLink } from "@/components/source-link";
import { getNewsArticle, getNewsArticles } from "@/lib/news";
import { breadcrumbJsonLd, newsArticleJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 1800;

export async function generateStaticParams() {
  const articles = await getNewsArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) return {};

  return pageMetadata({
    title: article.title,
    description: article.summary,
    path: `/news/${article.slug}`,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);

  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={newsArticleJsonLd({
          title: article.title,
          description: article.summary,
          path: `/news/${article.slug}`,
          datePublished: article.publishedAt,
          sourceUrl: article.sourceUrl,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: article.title, path: `/news/${article.slug}` },
        ])}
      />
      <PageHero eyebrow={article.eyebrow} title={article.title} description={article.summary} />
      <section className="px-5 py-14">
        <article className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <p className="text-lg leading-8 text-slate-700">{article.summary}</p>

            <h2 className="mt-8 text-3xl font-black text-slate-950">Key points</h2>
            <ul className="mt-4 grid gap-3">
              {article.keyPoints.map((point) => (
                <li key={point} className="rounded-2xl bg-slate-50 p-4 leading-7 text-slate-700">
                  {point}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-3xl font-black text-slate-950">Why it matters</h2>
            <p className="mt-4 leading-7 text-slate-700">{article.whyItMatters}</p>

            <h2 className="mt-8 text-3xl font-black text-slate-950">Public guidance</h2>
            <ul className="mt-4 grid gap-3">
              {article.guidance.map((point) => (
                <li key={point} className="rounded-2xl bg-teal-50 p-4 leading-7 text-teal-950">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-2xl font-black text-slate-950">Original source</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This page summarizes a source update. Use the original agency page for the
              complete notice and any later corrections.
            </p>
            <div className="mt-6">
            <SourceLink name={article.sourceName} url={article.sourceUrl} date={article.publishedAt} />
            </div>
          </aside>
        </article>
      </section>
    </>
  );
}
