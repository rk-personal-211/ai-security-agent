import { createAuthorizationUrl, exchangeAuthorizationCode } from "../adapters/github/github-oauth-adapter.js";
import { listGitHubRepositories } from "../adapters/github/github-repository-adapter.js";
import type { GitHubRepository, RepositoryPage } from "../types/github.js";
import { AppError } from "../utils/app-error.js";
import {
  createGitHubSession,
  getGitHubSession,
  setGitHubAccessToken,
  setSelectedRepository,
} from "./github-session-store.js";

function getConnectedSession(sessionId: string): { accessToken: string } {
  const session = getGitHubSession(sessionId);

  if (!session?.accessToken) {
    throw new AppError(401, "GITHUB_AUTH_REQUIRED", "Connect a GitHub account to continue.");
  }

  return { accessToken: session.accessToken };
}

export function startGitHubOAuth(): { authorizationUrl: string; sessionId: string } {
  const { sessionId, state } = createGitHubSession();

  return { authorizationUrl: createAuthorizationUrl(state), sessionId };
}

export async function completeGitHubOAuth(sessionId: string, code: string, state: string): Promise<void> {
  const session = getGitHubSession(sessionId);

  if (!session || !session.oauthState || session.oauthState !== state) {
    throw new AppError(400, "INVALID_OAUTH_STATE", "GitHub OAuth could not be verified.");
  }

  const accessToken = await exchangeAuthorizationCode(code);
  setGitHubAccessToken(sessionId, accessToken);
}

export async function getRepositories(sessionId: string, page: number, perPage: number): Promise<RepositoryPage> {
  const { accessToken } = getConnectedSession(sessionId);

  return listGitHubRepositories(accessToken, page, perPage);
}

export function getSelectedRepository(sessionId: string): GitHubRepository | undefined {
  return getGitHubSession(sessionId)?.selectedRepository;
}

export async function selectRepository(sessionId: string, repositoryId: number): Promise<GitHubRepository> {
  const { accessToken } = getConnectedSession(sessionId);
  const repositories = await listGitHubRepositories(accessToken, 1, 100);
  const repository = repositories.items.find((item) => item.id === repositoryId);

  if (!repository) {
    throw new AppError(404, "REPOSITORY_NOT_FOUND", "The selected repository is not available to this GitHub account.");
  }

  setSelectedRepository(sessionId, repository);

  return repository;
}
