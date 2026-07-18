import { openai, OPENAI_MODEL } from "../../config/openai.js";

import { retry } from "../../utils/retry.js";

import { AIAnalysisSchema } from "./analysis.schema.js";

import { buildAnalysisPrompt } from "./analysis.prompt.js";

import { AIAnalysis, SecurityFinding } from "./analysis.types.js";

export class OpenAIAnalysisService {
  async analyzeFinding(finding: SecurityFinding): Promise<AIAnalysis> {
    const prompt = buildAnalysisPrompt(finding);

    const response = await retry(async () => {
      return openai.responses.create({
        model: OPENAI_MODEL,
        input: prompt,
      });
    });

    const text = response.output_text;

    const json = JSON.parse(text);

    return AIAnalysisSchema.parse(json);
  }
}

export const analysisService = new OpenAIAnalysisService();
