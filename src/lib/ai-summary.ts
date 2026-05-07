import { z } from "zod";

export const aiSummarySchema = z.object({
  title: z.string().min(8),
  summary: z.string().min(40),
  sourceUrl: z.string().url(),
  sourcePublishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  citations: z.array(z.string().url()).min(1),
  aiAssisted: z.literal(true),
  reviewed: z.boolean(),
});

export type AiSummaryInput = z.infer<typeof aiSummarySchema>;

export function validateAiSummary(input: unknown) {
  const parsed = aiSummarySchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false as const,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  if (!parsed.data.reviewed) {
    return {
      ok: false as const,
      errors: ["AI summaries must be reviewed before publication."],
    };
  }

  return { ok: true as const, data: parsed.data };
}
