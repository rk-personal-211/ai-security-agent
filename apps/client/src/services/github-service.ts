import type { GitHubRepository } from "../types/github.js";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";

interface ApiSuccess<TData> {
  success: true;
  data: TData;
}

async function request<TData>(path: string, options?: RequestInit): Promise<TData> {
  const response = await fetch(`${apiUrl}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    throw new Error("GitHub request failed.");
  }

  return (payload as ApiSuccess<TData>).data;
}

export function beginGitHubOAuth(): void {
  window.location.assign(`${apiUrl}/github/oauth/start`);
}

export function listGitHubRepositories(): Promise<{ items: GitHubRepository[] }> {
  return request("/github/repositories");
}

export function getSelectedRepository(): Promise<GitHubRepository | null> {
  return request("/github/selected-repository");
}

export function selectGitHubRepository(repositoryId: number): Promise<GitHubRepository> {
  return request("/github/selected-repository", {
    method: "PUT",
    body: JSON.stringify({ repositoryId }),
  });
}
