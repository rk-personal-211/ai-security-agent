import { Octokit } from "@octokit/rest";

import { AppError } from "../utils/app-error.js";

import { getGitHubSession } from "./github-session-store.js";

export interface CreatePullRequestInput {
  sessionId: string;

  branchName: string;

  baseBranch: string;

  filePath: string;

  fileContent: string;

  commitMessage: string;

  pullRequestTitle: string;

  pullRequestBody: string;
}

export interface CreatePullRequestResult {
  url: string;

  number: number;

  branch: string;
}

export async function createPullRequest(
  input: CreatePullRequestInput,
): Promise<CreatePullRequestResult> {
  const session = getGitHubSession(input.sessionId);

  if (!session?.accessToken) {
    throw new AppError(
      401,
      "GITHUB_AUTH_REQUIRED",
      "Connect a GitHub account first.",
    );
  }

  if (!session.selectedRepository) {
    throw new AppError(
      400,
      "REPOSITORY_NOT_SELECTED",
      "Select a repository first.",
    );
  }

  const octokit = new Octokit({
    auth: session.accessToken,
  });

  const owner = session.selectedRepository.owner.login;
  const repo = session.selectedRepository.name;

  const base = await octokit.repos.getBranch({
    owner,
    repo,
    branch: input.baseBranch,
  });

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${input.branchName}`,
    sha: base.data.commit.sha,
  });

  const file = await octokit.repos.getContent({
    owner,
    repo,
    path: input.filePath,
    ref: input.branchName,
  });

  if (!("sha" in file.data)) {
    throw new AppError(
      500,
      "FILE_NOT_FOUND",
      "Unable to locate repository file.",
    );
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: input.filePath,
    branch: input.branchName,
    message: input.commitMessage,
    sha: file.data.sha,
    content: Buffer.from(input.fileContent).toString("base64"),
  });

  const pr = await octokit.pulls.create({
    owner,
    repo,
    head: input.branchName,
    base: input.baseBranch,
    title: input.pullRequestTitle,
    body: input.pullRequestBody,
  });

  return {
    url: pr.data.html_url,
    number: pr.data.number,
    branch: input.branchName,
  };
}
