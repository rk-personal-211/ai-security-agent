import { randomUUID } from "node:crypto";

import type { GitHubRepository } from "../types/github.js";

interface GitHubSession {
  accessToken?: string;
  oauthState: string;
  selectedRepository?: GitHubRepository;
}

const sessions = new Map<string, GitHubSession>();

export function createGitHubSession(): { sessionId: string; state: string } {
  const sessionId = randomUUID();
  const state = randomUUID();

  sessions.set(sessionId, { oauthState: state });

  return { sessionId, state };
}

export function getGitHubSession(sessionId: string): GitHubSession | undefined {
  return sessions.get(sessionId);
}

export function setGitHubAccessToken(sessionId: string, accessToken: string): void {
  const session = sessions.get(sessionId);

  if (session) {
    session.accessToken = accessToken;
    session.oauthState = "";
  }
}

export function setSelectedRepository(sessionId: string, repository: GitHubRepository): void {
  const session = sessions.get(sessionId);

  if (session) {
    session.selectedRepository = repository;
  }
}
