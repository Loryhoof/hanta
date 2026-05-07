import * as cheerio from "cheerio";
import Parser from "rss-parser";
import { officialSources } from "@/lib/site";
import { ingestedItemSchema, type IngestionResult, type IngestedItem } from "./types";

const rssParser = new Parser();

export const ingestionTargets = [
  {
    key: "who-don-api",
    name: "WHO Disease Outbreak News API",
    agency: "WHO",
    type: "json" as const,
    url: "https://www.who.int/api/emergencies/diseaseoutbreaknews",
  },
  {
    key: "who-don-page",
    name: "WHO Disease Outbreak News",
    agency: "WHO",
    type: "html" as const,
    url: "https://www.who.int/emergencies/disease-outbreak-news",
  },
  {
    key: "cdc-hantavirus-cases",
    name: "CDC reported U.S. hantavirus cases",
    agency: "CDC",
    type: "html" as const,
    url: "https://www.cdc.gov/hantavirus/data-research/cases/index.html",
  },
  {
    key: "ecdc-atlas",
    name: "ECDC Surveillance Atlas",
    agency: "ECDC",
    type: "html" as const,
    url: "https://www.ecdc.europa.eu/en/surveillance-atlas-infectious-diseases",
  },
];

export async function fetchRssFeed(url: string, sourceName: string, sourceAgency: string) {
  const feed = await rssParser.parseURL(url);
  return feed.items.map((item) =>
    ingestedItemSchema.parse({
      title: item.title ?? "Untitled update",
      url: item.link,
      publishedAt: item.isoDate?.slice(0, 10),
      sourceName,
      sourceAgency,
      summary: item.contentSnippet,
      raw: item,
    }),
  );
}

export async function fetchHtmlSource(target: (typeof ingestionTargets)[number]) {
  const response = await fetch(target.url, {
    headers: { "user-agent": "HantavirusPrevention.org source monitor" },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${target.url}: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const title =
    $("h1").first().text().trim() || $("title").first().text().trim() || target.name;
  const description =
    $("meta[name='description']").attr("content") ||
    $("main p").first().text().trim() ||
    undefined;

  return [
    ingestedItemSchema.parse({
      title,
      url: target.url,
      sourceName: target.name,
      sourceAgency: target.agency,
      summary: description,
      raw: {
        canonical: $("link[rel='canonical']").attr("href"),
        fetchedTitle: title,
      },
    }),
  ];
}

export async function fetchWhoDiseaseOutbreakNews(): Promise<IngestedItem[]> {
  const target = ingestionTargets[0];
  const response = await fetch(target.url, {
    headers: { accept: "application/json" },
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    return fetchHtmlSource(ingestionTargets[1]);
  }

  const payload = (await response.json()) as {
    value?: Array<{
      Title?: string;
      ItemDefaultUrl?: string;
      PublicationDateAndTime?: string;
      Summary?: string;
    }>;
  };

  return (payload.value ?? []).slice(0, 20).map((item) =>
    ingestedItemSchema.parse({
      title: item.Title ?? "WHO Disease Outbreak News update",
      url: item.ItemDefaultUrl?.startsWith("http")
        ? item.ItemDefaultUrl
        : `https://www.who.int${item.ItemDefaultUrl ?? "/emergencies/disease-outbreak-news"}`,
      publishedAt: item.PublicationDateAndTime?.slice(0, 10),
      sourceName: target.name,
      sourceAgency: target.agency,
      summary: item.Summary,
      raw: item,
    }),
  );
}

export async function runOfficialSourceIngestion(): Promise<IngestionResult[]> {
  const results = await Promise.allSettled([
    fetchWhoDiseaseOutbreakNews(),
    ...ingestionTargets.slice(2).map((target) => fetchHtmlSource(target)),
  ]);

  return results.map((result, index) => {
    const target = index === 0 ? ingestionTargets[0] : ingestionTargets[index + 1];
    if (result.status === "fulfilled") {
      return { source: target.name, ok: true, items: result.value };
    }

    return {
      source: target.name,
      ok: false,
      items: [],
      error: result.reason instanceof Error ? result.reason.message : "Unknown ingestion error",
    };
  });
}

export function getSeedSources() {
  return officialSources.map((source) => ({
    ...source,
    type:
      source.agency === "NASA" || source.agency === "NOAA"
        ? "climate"
        : source.agency === "GBIF"
          ? "ecology"
          : "official",
  }));
}
