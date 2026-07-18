import { Router, type Router as RouterType } from "express";

import { healthRouter } from "./health-routes.js";
import { githubRouter } from "./github-routes.js";
import analysisRoutes from "../ai/analysis/analysis.routes.js";
import patchRoutes from "../ai/patch/patch.routes.js";
import chatRoutes from "../ai/chat/chat.routes.js";

export const apiRouter: RouterType = Router();

apiRouter.use(healthRouter);
apiRouter.use("/github", githubRouter);

apiRouter.use("/api/analysis", analysisRoutes);
apiRouter.use("/api/patch", patchRoutes);
apiRouter.use("/api/chat", chatRoutes);
