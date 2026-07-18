// apps/api/src/ai/analysis/analysis.routes.ts

import { Router, type Router as RouterType } from "express";
import { analyzeFinding } from "./analysis.controller.js";

export const router: RouterType = Router();

router.post("/", analyzeFinding);

export default router;