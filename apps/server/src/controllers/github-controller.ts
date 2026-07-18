import type { Request, Response } from "express";
import { z } from "zod";

import { env } from "../config/index.js";
import {
  completeGitHubOAuth,
  getRepositories,
  getSelectedRepository,
  selectRepository,
  startGitHubOAuth,
} from "../services/github-service.js";
import type { ApiSuccess } from "../types/api.js";
import type { GitHubRepository, RepositoryPage } from "../types/github.js";
import { AppError } from "../utils/app-error.js";
import { createPullRequest } from "../services/github-pr.service.js";

const sessionCookieName = "fix_factory_session";
const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(30),
});
const callbackQuerySchema = z.object({
  code: z.string().min(1),
  state: z.string().uuid(),
});
const selectedRepositorySchema = z.object({
  repositoryId: z.number().int().positive(),
});

function getSessionId(request: Request): string {
  const cookie = request.headers.cookie
    ?.split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${sessionCookieName}=`));
  const sessionId = cookie?.slice(sessionCookieName.length + 1);

  if (!sessionId) {
    throw new AppError(
      401,
      "GITHUB_AUTH_REQUIRED",
      "Connect a GitHub account to continue.",
    );
  }

  return decodeURIComponent(sessionId);
}

function setSessionCookie(response: Response, sessionId: string): void {
  response.cookie(sessionCookieName, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
  });
}

export function beginGitHubOAuth(_request: Request, response: Response): void {
  const { authorizationUrl, sessionId } = startGitHubOAuth();

  setSessionCookie(response, sessionId);
  response.redirect(302, authorizationUrl);
}

export async function githubOAuthCallback(
  request: Request,
  response: Response,
): Promise<void> {
  const { code, state } = callbackQuerySchema.parse(request.query);
  const sessionId = getSessionId(request);

  await completeGitHubOAuth(sessionId, code, state);
  response.redirect(302, `${env.WEB_ORIGIN}/?github=connected`);
}

export async function listRepositories(
  request: Request,
  response: Response,
): Promise<void> {
  const { page, perPage } = querySchema.parse(request.query);
  const data: RepositoryPage = await getRepositories(
    getSessionId(request),
    page,
    perPage,
  );
  const body: ApiSuccess<RepositoryPage> = { success: true, data };

  response.status(200).json(body);
}

export function readSelectedRepository(
  request: Request,
  response: Response,
): void {
  const data = getSelectedRepository(getSessionId(request)) ?? null;
  const body: ApiSuccess<GitHubRepository | null> = { success: true, data };

  response.status(200).json(body);
}

export async function updateSelectedRepository(
  request: Request,
  response: Response,
): Promise<void> {
  const { repositoryId } = selectedRepositorySchema.parse(request.body);
  const data = await selectRepository(getSessionId(request), repositoryId);
  const body: ApiSuccess<GitHubRepository> = { success: true, data };

  response.status(200).json(body);
}

export async function createRepositoryPullRequest(req: Request, res: Response) {
  const result = await createPullRequest({
    sessionId: req.params.sessionId,

    ...req.body,
  });

  res.status(201).json(result);
}
