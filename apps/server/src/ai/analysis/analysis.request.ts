// apps/api/src/ai/analysis/analysis.request.ts

import { z } from "zod";

export const SecurityFindingSchema = z.object({
  id: z.string(),

  title: z.string(),

  severity: z.string(),

  description: z.string(),

  scanner: z.string(),

  source: z.string(),

  file: z.string(),

  cwe: z.string().optional(),

  cve: z.string().optional(),
});

export type SecurityFindingRequest = z.infer<
  typeof SecurityFindingSchema
>;