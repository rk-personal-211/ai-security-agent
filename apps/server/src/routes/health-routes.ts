import { Router, type Router as RouterType } from "express";

import { getHealth } from "../controllers/health-controller.js";

export const healthRouter: RouterType = Router();

healthRouter.get("/health", getHealth);
