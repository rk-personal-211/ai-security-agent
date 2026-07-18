import { z } from "zod";

export const AIAnalysisSchema = z.object({
  summary: z.string(),

  rootCause: z.string(),

  businessImpact: z.string(),

  attackScenario: z.string(),

  recommendation: z.string(),

  confidence: z.number().min(0).max(100),

  references: z.array(z.string()),
});

export type AIAnalysisResponse = z.infer<
  typeof AIAnalysisSchema
>;