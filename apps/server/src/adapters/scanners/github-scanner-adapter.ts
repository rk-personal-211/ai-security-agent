import { normalizedFindingSchema, type NormalizedFinding } from "@security-agent/shared";

import type { ScannerAdapter, ScannerMetadata } from "./scanner-adapter.js";

interface GitHubSecurityFinding {
  alertNumber: number;
  htmlUrl: string;
  location: { endLine?: number; path: string; startLine: number };
  rule: { description: string; id: string; securitySeverity: "critical" | "high" | "medium" | "low" };
  state: "open" | "dismissed";
}

const mockGitHubFindings: GitHubSecurityFinding[] = [
  {
    alertNumber: 42,
    htmlUrl: "https://github.com/acme/customer-api/security/code-scanning/42",
    location: { endLine: 28, path: "src/controllers/user-controller.ts", startLine: 24 },
    rule: {
      description: "User-controlled input reaches a SQL query without parameterization.",
      id: "js/sql-injection",
      securitySeverity: "critical",
    },
    state: "open",
  },
];

export const githubScannerAdapter: ScannerAdapter<GitHubSecurityFinding> = {
  async getFindings(): Promise<GitHubSecurityFinding[]> {
    return mockGitHubFindings;
  },

  metadata(): ScannerMetadata {
    return { id: "github-code-scanning", name: "GitHub Code Scanning", version: "mock-v1" };
  },

  normalize(finding: GitHubSecurityFinding): NormalizedFinding {
    return normalizedFindingSchema.parse({
      id: `github-code-scanning-${finding.alertNumber}`,
      scanner: this.metadata().name,
      ruleId: finding.rule.id,
      title: "Potential SQL injection",
      description: finding.rule.description,
      severity: finding.rule.securitySeverity,
      filePath: finding.location.path,
      startLine: finding.location.startLine,
      endLine: finding.location.endLine,
      remediation: `Review the GitHub alert: ${finding.htmlUrl}`,
    });
  },
};
