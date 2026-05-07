import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const riskLevelEnum = pgEnum("risk_level", ["low", "watch", "elevated", "active"]);
export const sourceTypeEnum = pgEnum("source_type", [
  "official",
  "research",
  "news",
  "climate",
  "ecology",
]);
export const reviewStatusEnum = pgEnum("review_status", ["draft", "pending", "approved", "rejected"]);

export const sources = pgTable(
  "sources",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 180 }).notNull(),
    agency: varchar("agency", { length: 80 }).notNull(),
    type: sourceTypeEnum("type").notNull().default("official"),
    url: text("url").notNull(),
    priority: integer("priority").notNull().default(50),
    cadence: varchar("cadence", { length: 80 }),
    lastFetchedAt: timestamp("last_fetched_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("sources_url_idx").on(table.url)],
);

export const sourceItems = pgTable(
  "source_items",
  {
    id: serial("id").primaryKey(),
    sourceId: integer("source_id").references(() => sources.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    url: text("url").notNull(),
    publishedAt: date("published_at"),
    fetchedAt: timestamp("fetched_at", { withTimezone: true }).defaultNow().notNull(),
    raw: jsonb("raw"),
    contentHash: varchar("content_hash", { length: 96 }),
  },
  (table) => [
    uniqueIndex("source_items_url_idx").on(table.url),
    index("source_items_published_idx").on(table.publishedAt),
  ],
);

export const locations = pgTable(
  "locations",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    countryCode: varchar("country_code", { length: 8 }),
    regionType: varchar("region_type", { length: 60 }).notNull().default("region"),
    latitude: text("latitude"),
    longitude: text("longitude"),
    canonicalPath: text("canonical_path").notNull(),
    lastReviewedAt: date("last_reviewed_at"),
  },
  (table) => [uniqueIndex("locations_slug_idx").on(table.slug)],
);

export const outbreaks = pgTable(
  "outbreaks",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    locationId: integer("location_id").references(() => locations.id),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    riskLevel: riskLevelEnum("risk_level").notNull().default("watch"),
    cases: integer("cases"),
    deaths: integer("deaths"),
    sourceItemId: integer("source_item_id").references(() => sourceItems.id),
    startedAt: date("started_at"),
    lastUpdatedAt: date("last_updated_at"),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
  },
  (table) => [
    uniqueIndex("outbreaks_slug_idx").on(table.slug),
    index("outbreaks_risk_idx").on(table.riskLevel),
  ],
);

export const caseStats = pgTable(
  "case_stats",
  {
    id: serial("id").primaryKey(),
    locationId: integer("location_id").references(() => locations.id),
    year: integer("year").notNull(),
    cases: integer("cases").notNull().default(0),
    deaths: integer("deaths").notNull().default(0),
    sourceItemId: integer("source_item_id").references(() => sourceItems.id),
    notes: text("notes"),
  },
  (table) => [uniqueIndex("case_stats_location_year_idx").on(table.locationId, table.year)],
);

export const riskAssessments = pgTable(
  "risk_assessments",
  {
    id: serial("id").primaryKey(),
    locationId: integer("location_id").references(() => locations.id),
    riskLevel: riskLevelEnum("risk_level").notNull(),
    rationale: text("rationale").notNull(),
    evidence: jsonb("evidence").notNull(),
    assessedAt: timestamp("assessed_at", { withTimezone: true }).defaultNow().notNull(),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
  },
  (table) => [index("risk_assessments_location_idx").on(table.locationId)],
);

export const articles = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 180 }).notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    sourceItemId: integer("source_item_id").references(() => sourceItems.id),
    publishedAt: date("published_at"),
    canonicalPath: text("canonical_path").notNull(),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
  },
  (table) => [uniqueIndex("articles_slug_idx").on(table.slug)],
);

export const researchPapers = pgTable(
  "research_papers",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    authors: text("authors"),
    journal: text("journal"),
    publicationDate: date("publication_date"),
    doi: varchar("doi", { length: 180 }),
    url: text("url").notNull(),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
  },
  (table) => [uniqueIndex("research_papers_url_idx").on(table.url)],
);

export const aiSummaries = pgTable(
  "ai_summaries",
  {
    id: serial("id").primaryKey(),
    articleId: integer("article_id").references(() => articles.id, { onDelete: "cascade" }),
    researchPaperId: integer("research_paper_id").references(() => researchPapers.id, {
      onDelete: "cascade",
    }),
    summary: text("summary").notNull(),
    citations: jsonb("citations").notNull(),
    model: varchar("model", { length: 120 }),
    reviewStatus: reviewStatusEnum("review_status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("ai_summaries_review_idx").on(table.reviewStatus)],
);

export const emailSubscribers = pgTable(
  "email_subscribers",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    region: varchar("region", { length: 120 }).default("global"),
    confirmed: boolean("confirmed").notNull().default(false),
    tokenHash: varchar("token_hash", { length: 96 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("email_subscribers_email_idx").on(table.email)],
);

export const alertEvents = pgTable(
  "alert_events",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    region: varchar("region", { length: 120 }).default("global"),
    sourceItemId: integer("source_item_id").references(() => sourceItems.id),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("alert_events_region_idx").on(table.region)],
);

export const redirects = pgTable(
  "redirects",
  {
    id: serial("id").primaryKey(),
    sourceHost: varchar("source_host", { length: 180 }).notNull(),
    sourcePath: text("source_path").notNull().default("/"),
    targetPath: text("target_path").notNull(),
    permanent: boolean("permanent").notNull().default(true),
  },
  (table) => [uniqueIndex("redirects_source_idx").on(table.sourceHost, table.sourcePath)],
);
