import { openai, OPENAI_MODEL } from "../../config/openai.js";

import { retry } from "../../utils/retry.js";

import { PatchResponseSchema } from "./patch.schema.js";

import { buildPatchPrompt } from "./patch.prompt.js";

import { PatchRequest, PatchResponse } from "./patch.types.js";

export class OpenAIPatchService {
  async generatePatch(request: PatchRequest): Promise<PatchResponse> {
    const prompt = buildPatchPrompt(request);

    const response = await retry(() =>
      openai.responses.create({
        model: OPENAI_MODEL,
        input: prompt,
      }),
    );

    const json = JSON.parse(response.output_text);

    return PatchResponseSchema.parse(json);
  }
}

export const patchService = new OpenAIPatchService();
