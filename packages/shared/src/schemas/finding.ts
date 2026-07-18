import { z } from "zod";

export const findingSeveritySchema = z.enum(["critical", "high", "medium", "low", "info"]);

export const normalizedFindingSchema = z.object({
  id: z.string(),
  scanner: z.string(),
  ruleId: z.string(),
  title: z.string(),
  description: z.string(),
  severity: findingSeveritySchema,
  filePath: z.string(),
  startLine: z.number().int().positive(),
  endLine: z.number().int().positive().optional(),
  remediation: z.string().optional(),
});

export type FindingSeverity = z.infer<typeof findingSeveritySchema>;
export type NormalizedFinding = z.infer<typeof normalizedFindingSchema>;
