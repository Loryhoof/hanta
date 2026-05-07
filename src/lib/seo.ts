import type { Metadata } from "next";
import { site } from "@/lib/site";

export function canonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${normalized === "/" ? "" : normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function faqPageJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function medicalWebPageJsonLd({
  title,
  description,
  path,
  reviewedAt,
}: {
  title: string;
  description: string;
  path: string;
  reviewedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description,
    url: canonicalUrl(path),
    lastReviewed: reviewedAt,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
  };
}

export function newsArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  sourceUrl,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  sourceUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    url: canonicalUrl(path),
    datePublished,
    dateModified: dateModified ?? datePublished,
    isBasedOn: sourceUrl,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };
}
