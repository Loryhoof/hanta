import { z } from "zod";

export const ingestedItemSchema = z.object({
  title: z.string().min(3),
  url: z.string().url(),
  publishedAt: z.string().optional(),
  sourceName: z.string().min(2),
  sourceAgency: z.string().min(2),
  summary: z.string().optional(),
  raw: z.unknown().optional(),
});

export type IngestedItem = z.infer<typeof ingestedItemSchema>;

export type IngestionResult = {
  source: string;
  ok: boolean;
  items: IngestedItem[];
  error?: string;
};
