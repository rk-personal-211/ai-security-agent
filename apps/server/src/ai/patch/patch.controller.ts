import { Request, Response } from "express";

import { patchService } from "./patch.service.js";

export async function generatePatch(
  req: Request,
  res: Response
) {
  try {
    const patch =
      await patchService.generatePatch(req.body);

    res.json({
      success: true,
      data: patch,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to generate patch.",
    });
  }
}