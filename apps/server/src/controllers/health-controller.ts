import type { Request, Response } from "express";

import { getHealthStatus } from "../services/health-service.js";
import type { ApiSuccess } from "../types/api.js";

export function getHealth(_request: Request, response: Response): void {
  const body: ApiSuccess<ReturnType<typeof getHealthStatus>> = {
    success: true,
    data: getHealthStatus(),
  };

  response.status(200).json(body);
}
