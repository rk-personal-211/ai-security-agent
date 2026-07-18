export interface GitHubRepository {
  defaultBranch: string;
  fullName: string;
  htmlUrl: string;
  id: number;
  isPrivate: boolean;
  name: string;
  owner: string;
}

export interface RepositoryPage {
  items: GitHubRepository[];
  page: number;
  perPage: number;
}


export interface CreatePRRequest {
  owner: string;
  repo: string;

  baseBranch: string;

  branchName: string;

  filePath: string;

  commitMessage: string;

  pullRequestTitle: string;

  pullRequestBody: string;

  fileContent: string;
}

export interface CreatePRResponse {
  pullRequestUrl: string;

  pullRequestNumber: number;

  branch: string;
}