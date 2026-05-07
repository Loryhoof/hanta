import type { MetadataRoute } from "next";
import { locationPages, outbreaks } from "@/lib/content";
import { getNewsArticles } from "@/lib/news";
import { canonicalUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getNewsArticles();

  const staticPaths: Array<{ path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }> = [
    { path: "/", priority: 1, changeFrequency: "daily" },
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/map", priority: 0.9, changeFrequency: "daily" },
    { path: "/prevention", priority: 0.9, changeFrequency: "monthly" },
    { path: "/symptoms", priority: 0.85, changeFrequency: "monthly" },
    { path: "/transmission", priority: 0.8, changeFrequency: "monthly" },
    { path: "/what-is-hantavirus", priority: 0.8, changeFrequency: "monthly" },
    { path: "/case-statistics", priority: 0.75, changeFrequency: "weekly" },
    { path: "/dashboard", priority: 0.75, changeFrequency: "weekly" },
    { path: "/outbreaks", priority: 0.75, changeFrequency: "daily" },
    { path: "/mortality-rate", priority: 0.65, changeFrequency: "monthly" },
    { path: "/deaths", priority: 0.65, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.65, changeFrequency: "monthly" },
    { path: "/resources", priority: 0.55, changeFrequency: "monthly" },
    { path: "/research", priority: 0.55, changeFrequency: "monthly" },
  ];

  return [
    ...staticPaths.map((item) => ({
      url: canonicalUrl(item.path),
      lastModified: new Date("2026-05-07"),
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    })),
    ...articles.map((article) => ({
      url: canonicalUrl(`/news/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...outbreaks.map((region) => ({
      url: canonicalUrl(`/outbreaks/${region.slug}`),
      lastModified: new Date(region.lastUpdated),
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...locationPages.map((page) => ({
      url: canonicalUrl(`/locations/${page.slug}`),
      lastModified: new Date(page.lastReviewed),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}
