import { Router, type Router as RouterType } from "express";

import { generatePatch } from "./patch.controller.js";

export const router: RouterType = Router();

router.post("/", generatePatch);

export default router;