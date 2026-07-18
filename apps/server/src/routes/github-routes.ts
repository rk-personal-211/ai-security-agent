import { Router, type Router as RouterType } from "express";

import {
  beginGitHubOAuth,
  createRepositoryPullRequest,
  githubOAuthCallback,
  listRepositories,
  readSelectedRepository,
  updateSelectedRepository,
} from "../controllers/github-controller.js";

export const githubRouter: RouterType = Router();

githubRouter.get("/oauth/start", beginGitHubOAuth);
githubRouter.get("/oauth/callback", githubOAuthCallback);
githubRouter.get("/repositories", listRepositories);
githubRouter.get("/selected-repository", readSelectedRepository);
githubRouter.put("/selected-repository", updateSelectedRepository);
githubRouter.post("/:sessionId/pull-request", createRepositoryPullRequest);
