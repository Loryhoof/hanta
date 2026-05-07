import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-shell";
import { faq } from "@/lib/content";
import { breadcrumbJsonLd, faqPageJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hantavirus FAQ",
  description: "Common questions about hantavirus risk, prevention, symptoms, and data updates.",
  path: "/faq",
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <PageHero
        eyebrow="FAQ"
        title="Common hantavirus questions."
        description="Plain-language answers about risk, prevention, symptoms, data freshness, and how to interpret reported updates."
      />
      <section className="px-5 py-14">
        <div className="mx-auto grid max-w-4xl gap-4">
          {faq.map((item) => (
            <article key={item.question} className="rounded-3xl border border-slate-200 bg-white p-7">
              <h2 className="text-2xl font-black text-slate-950">{item.question}</h2>
              <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
