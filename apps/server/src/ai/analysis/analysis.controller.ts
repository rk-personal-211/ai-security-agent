// apps/api/src/ai/analysis/analysis.controller.ts

import { Request, Response } from "express";

import { analysisService } from "./analysis.service.js";

import { SecurityFindingSchema } from "./analysis.request.js";

export async function analyzeFinding(
  req: Request,
  res: Response
) {
  try {
    const finding = SecurityFindingSchema.parse(req.body);

    const analysis =
      await analysisService.analyzeFinding(
        finding
      );

    return res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to analyze finding",
    });
  }
}