import type { ErrorRequestHandler } from "express";

import { env } from "../config/index.js";
import type { ApiError } from "../types/api.js";
import { AppError } from "../utils/app-error.js";
import { logger } from "../utils/logger.js";

export const errorHandler: ErrorRequestHandler = (error: unknown, request, response, _next) => {
  const appError = error instanceof AppError
    ? error
    : new AppError(500, "INTERNAL_ERROR", "An unexpected error occurred.");

  logger.error("Request failed", {
    code: appError.code,
    error: error instanceof Error ? error.message : "Unknown error",
    method: request.method,
    path: request.path,
    requestId: request.requestId,
    statusCode: appError.statusCode,
  });

  const body: ApiError = {
    success: false,
    error: {
      code: appError.code,
      message: appError.statusCode === 500 && env.NODE_ENV === "production"
        ? "An unexpected error occurred."
        : appError.message,
      requestId: request.requestId,
    },
  };

  response.status(appError.statusCode).json(body);
};
