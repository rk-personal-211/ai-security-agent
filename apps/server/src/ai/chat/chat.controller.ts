import { Request, Response } from "express";

import { ChatRequestSchema } from "./chat.schema.js";

import { chatService } from "./chat.service.js";

export async function askQuestion(req: Request, res: Response) {
  const request = ChatRequestSchema.parse(req.body);

  const result = await chatService.ask(request);

  res.json(result);
}
