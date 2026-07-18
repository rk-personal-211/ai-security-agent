import { openai, OPENAI_MODEL } from "../../config/openai.js";

import { retry } from "../../utils/retry.js";

import { buildChatPrompt } from "./chat.prompt.js";

import { ChatRequest, ChatResponse } from "./chat.types.js";

export class ChatService {
  async ask(request: ChatRequest): Promise<ChatResponse> {
    const response = await retry(() =>
      openai.responses.create({
        model: OPENAI_MODEL,
        input: buildChatPrompt(request),
      }),
    );

    return {
      answer: response.output_text,
    };
  }
}

export const chatService = new ChatService();
