import { Router, type Router as RouterType } from "express";

import { askQuestion } from "./chat.controller.js";

export const router: RouterType = Router();

router.post("/", askQuestion);

export default router;
