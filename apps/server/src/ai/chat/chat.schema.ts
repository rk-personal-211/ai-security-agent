import { z } from "zod";

export const ChatRequestSchema = z.object({
  finding: z.object({
    title: z.string(),
    severity: z.string(),
    description: z.string(),
    cwe: z.string().optional(),
    cve: z.string().optional(),
  }),

  question: z.string().min(1),

  previousAnalysis: z
    .object({
      summary: z.string(),
      rootCause: z.string(),
      recommendation: z.string(),
    })
    .optional(),
});
