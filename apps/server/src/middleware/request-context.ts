import { randomUUID } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

import { logger } from "../utils/logger.js";

export function requestContext(request: Request, response: Response, next: NextFunction): void {
  const requestId = request.header("x-request-id") ?? randomUUID();
  const startedAt = performance.now();

  request.requestId = requestId;
  response.setHeader("x-request-id", requestId);

  response.on("finish", () => {
    logger.info("Request completed", {
      durationMs: Math.round(performance.now() - startedAt),
      method: request.method,
      path: request.path,
      requestId,
      statusCode: response.statusCode,
    });
  });

  next();
}
