import * as cheerio from "cheerio";
import Parser from "rss-parser";

export type NewsArticle = {
  slug: string;
  title: string;
  eyebrow: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  keyPoints: string[];
  whyItMatters: string;
  guidance: string[];
};

type WhoDonItem = {
  Title?: string;
  UrlName?: string;
  ItemDefaultUrl?: string;
  PublicationDateAndTime?: string;
  Summary?: string;
  Overview?: string;
  Assessment?: string;
  Advice?: string;
  Response?: string;
};

const whoDonEndpoint =
  "https://www.who.int/api/emergencies/diseaseoutbreaknews?%24orderby=PublicationDateAndTime%20desc&%24top=50";
const googleNewsEndpoint =
  "https://news.google.com/rss/search?q=hantavirus%20when%3A30d&hl=en-US&gl=US&ceid=US:en";
const rssParser = new Parser();

const sourceUnavailableFallback: NewsArticle[] = [
  {
    slug: "source-temporarily-unavailable",
    title: "Hantavirus news sources are temporarily unavailable",
    eyebrow: "Source status",
    publishedAt: new Date().toISOString().slice(0, 10),
    sourceName: "WHO Disease Outbreak News",
    sourceUrl: "https://www.who.int/emergencies/disease-outbreak-news",
    summary:
      "Live news sources could not be reached. Check WHO Disease Outbreak News or national public health agencies directly for the latest updates.",
    keyPoints: [
      "The live news feed did not return usable items.",
      "Official public-health sources remain the best place to verify current outbreak information.",
    ],
    whyItMatters:
      "Recent updates may be delayed until the source feeds respond again.",
    guidance: [
      "Check WHO Disease Outbreak News for official global updates.",
      "Use national or local health agencies for regional guidance.",
    ],
  },
];

const defaultHantavirusKeyPoints = [
  "Human hantavirus infection is usually linked to exposure to infected rodents or contaminated materials.",
  "Official public-health sources should be used for confirmed case counts and risk guidance.",
];

const defaultHantavirusGuidance = [
  "Avoid contact with rodent urine, droppings, saliva, and nesting materials.",
  "Seek medical care if compatible symptoms follow possible rodent exposure.",
];

function textFromHtml(input = "") {
  return cheerio.load(input).text().replace(/\s+/g, " ").trim();
}

function firstSentences(text: string, maxSentences: number) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, maxSentences);
}

function whoItemUrl(item: WhoDonItem) {
  if (item.UrlName) {
    return `https://www.who.int/emergencies/disease-outbreak-news/item/${item.UrlName}`;
  }

  if (item.ItemDefaultUrl?.startsWith("http")) return item.ItemDefaultUrl;

  return "https://www.who.int/emergencies/disease-outbreak-news";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}

function splitGoogleNewsTitle(title = "Hantavirus news update") {
  const parts = title.split(" - ");
  if (parts.length < 2) return { headline: title, sourceName: "Google News" };

  const sourceName = parts.at(-1) ?? "Google News";
  return {
    headline: parts.slice(0, -1).join(" - "),
    sourceName,
  };
}

function publishedTime(article: NewsArticle) {
  const time = new Date(`${article.publishedAt}T00:00:00Z`).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function sortNewestFirst(articles: NewsArticle[]) {
  return [...articles].sort((a, b) => publishedTime(b) - publishedTime(a));
}

function articleFromWhoItem(item: WhoDonItem): NewsArticle {
  const summaryText = textFromHtml(item.Summary);
  const overviewText = textFromHtml(item.Overview);
  const assessmentText = textFromHtml(item.Assessment);
  const adviceText = textFromHtml(item.Advice);
  const title = item.Title ?? "WHO Disease Outbreak News update";
  const slug = item.UrlName ?? item.ItemDefaultUrl?.replace(/^\//, "") ?? title.toLowerCase();

  const keyPoints = [
    ...firstSentences(summaryText, 2),
    ...firstSentences(overviewText, 2),
  ]
    .filter((point, index, all) => all.indexOf(point) === index)
    .slice(0, 4);

  const guidance = firstSentences(adviceText, 3);

  return {
    slug,
    title,
    eyebrow: "WHO Disease Outbreak News",
    publishedAt: item.PublicationDateAndTime?.slice(0, 10) ?? "Unknown date",
    sourceName: "WHO",
    sourceUrl: whoItemUrl(item),
    summary:
      firstSentences(summaryText || overviewText, 2).join(" ") ||
      "WHO published a Disease Outbreak News update relevant to hantavirus monitoring.",
    keyPoints: keyPoints.length ? keyPoints : defaultHantavirusKeyPoints,
    whyItMatters:
      firstSentences(assessmentText, 2).join(" ") ||
      "This item is relevant because it comes from WHO's official Disease Outbreak News channel.",
    guidance: guidance.length ? guidance : defaultHantavirusGuidance,
  };
}

async function getGoogleNewsArticles(): Promise<NewsArticle[]> {
  const feed = await rssParser.parseURL(googleNewsEndpoint);

  return feed.items.slice(0, 12).map((item) => {
    const { headline, sourceName } = splitGoogleNewsTitle(item.title);
    const publishedAt = item.isoDate?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
    const summary =
      item.contentSnippet?.replace(/\s+/g, " ").trim() ||
      `Recent reporting from ${sourceName} about hantavirus.`;
    const slug = `news-${publishedAt}-${slugify(headline)}`;

    return {
      slug,
      title: headline,
      eyebrow: "News report",
      publishedAt,
      sourceName,
      sourceUrl: item.link ?? googleNewsEndpoint,
      summary,
      keyPoints: [
        summary,
        "This is a media report, so details should be checked against official public-health updates when available.",
      ],
      whyItMatters:
        "Recent reporting can surface developing events faster than official surveillance tables, but it should be interpreted alongside agency updates and source dates.",
      guidance: [
        "Use official public-health agencies for confirmed case counts and public guidance.",
        "For symptoms after possible rodent exposure, contact a clinician or local public health authority.",
      ],
    };
  });
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const [whoResult, googleResult] = await Promise.allSettled([
      fetch(whoDonEndpoint, {
        headers: { accept: "application/json" },
        next: { revalidate: 1800 },
      }).then(async (response) => {
        if (!response.ok) return [];
        const payload = (await response.json()) as { value?: WhoDonItem[] };
        return (payload.value ?? [])
          .filter((item) =>
            [item.Title, item.Summary, item.Overview]
              .join(" ")
              .toLowerCase()
              .includes("hantavirus"),
          )
          .map(articleFromWhoItem);
      }),
      getGoogleNewsArticles(),
    ]);

    const liveArticles = [
      ...(whoResult.status === "fulfilled" ? whoResult.value : []),
      ...(googleResult.status === "fulfilled" ? googleResult.value : []),
    ];

    const merged = liveArticles.filter(
      (article, index, all) => all.findIndex((item) => item.slug === article.slug) === index,
    );

    return merged.length ? sortNewestFirst(merged) : sourceUnavailableFallback;
  } catch {
    return sourceUnavailableFallback;
  }
}

export async function getNewsArticle(slug: string) {
  const articles = await getNewsArticles();
  return articles.find((article) => article.slug === slug);
}
