import { z } from "zod";

export const PatchResponseSchema = z.object({
  explanation: z.string(),

  confidence: z.number(),

  patchedCode: z.string(),

  diff: z.string(),
});

export type PatchResponse = z.infer<
  typeof PatchResponseSchema
>;