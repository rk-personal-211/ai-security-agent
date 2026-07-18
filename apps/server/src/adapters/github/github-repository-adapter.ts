import { Octokit } from "octokit";

import type { GitHubRepository, RepositoryPage } from "../../types/github.js";

export async function listGitHubRepositories(
  accessToken: string,
  page: number,
  perPage: number,
): Promise<RepositoryPage> {
  const octokit = new Octokit({ auth: accessToken });
  const response = await octokit.rest.repos.listForAuthenticatedUser({
    page,
    per_page: perPage,
    sort: "full_name",
  });

  return {
    items: response.data.map((repository): GitHubRepository => ({
      defaultBranch: repository.default_branch,
      fullName: repository.full_name,
      htmlUrl: repository.html_url,
      id: repository.id,
      isPrivate: repository.private,
      name: repository.name,
      owner: repository.owner.login,
    })),
    page,
    perPage,
  };
}
