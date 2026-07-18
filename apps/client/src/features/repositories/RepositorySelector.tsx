import { useEffect, useState } from "react";
import { Alert, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

import { getSelectedRepository, listGitHubRepositories, selectGitHubRepository } from "../../services/github-service.js";
import type { GitHubRepository } from "../../types/github.js";

export function RepositorySelector(): JSX.Element {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [selectedRepositoryId, setSelectedRepositoryId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRepositories(): Promise<void> {
      try {
        const [repositoryPage, selectedRepository] = await Promise.all([
          listGitHubRepositories(),
          getSelectedRepository(),
        ]);
        setRepositories(repositoryPage.items);
        setSelectedRepositoryId(selectedRepository?.id.toString() ?? "");
      } catch {
        setError("Connect GitHub to select a repository.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadRepositories();
  }, []);

  async function handleChange(repositoryId: string): Promise<void> {
    setSelectedRepositoryId(repositoryId);
    setError(null);

    try {
      await selectGitHubRepository(Number(repositoryId));
    } catch {
      setError("We could not save the selected repository.");
    }
  }

  if (isLoading) {
    return <CircularProgress size={24} aria-label="Loading repositories" />;
  }

  if (error) {
    return <Alert severity="info">{error}</Alert>;
  }

  return (
    <Stack spacing={1} sx={{ minWidth: { xs: "100%", sm: 280 } }}>
      <FormControl size="small">
        <InputLabel id="repository-selector-label">Repository</InputLabel>
        <Select label="Repository" labelId="repository-selector-label" onChange={(event) => void handleChange(event.target.value)} value={selectedRepositoryId}>
          {repositories.map((repository) => <MenuItem key={repository.id} value={repository.id.toString()}>{repository.fullName}</MenuItem>)}
        </Select>
      </FormControl>
    </Stack>
  );
}
