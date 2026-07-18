export type FindingSeverity = "Critical" | "High" | "Medium" | "Low";

export interface MockFinding {
  cve: string | null;
  cwe: string;
  filePath: string;
  fixAvailable: boolean;
  id: string;
  title: string;
  repository: string;
  severity: FindingSeverity;
  scanner: string;
  updatedAt: string;
}

export const mockFindings: MockFinding[] = [
  {
    cve: null,
    cwe: "CWE-89",
    filePath: "src/controllers/user-controller.ts",
    fixAvailable: true,
    id: "GHSA-001",
    title: "SQL injection in user lookup",
    repository: "acme/customer-api",
    severity: "Critical",
    scanner: "CodeQL",
    updatedAt: "8 minutes ago",
  },
  {
    cve: "CVE-2025-12345",
    cwe: "CWE-20",
    filePath: "package.json",
    fixAvailable: true,
    id: "GHSA-002",
    title: "Outdated vulnerable dependency",
    repository: "acme/customer-api",
    severity: "High",
    scanner: "Dependabot",
    updatedAt: "42 minutes ago",
  },
  {
    cve: null,
    cwe: "CWE-601",
    filePath: "src/routes/login.ts",
    fixAvailable: false,
    id: "SARIF-103",
    title: "Unvalidated redirect target",
    repository: "acme/web-app",
    severity: "Medium",
    scanner: "SARIF",
    updatedAt: "2 hours ago",
  },
  {
    cve: null,
    cwe: "CWE-79",
    filePath: "src/components/Preview.tsx",
    fixAvailable: true,
    id: "GHSA-004",
    repository: "acme/web-app",
    scanner: "CodeQL",
    severity: "High",
    title: "Cross-site scripting in preview renderer",
    updatedAt: "3 hours ago",
  },
  {
    cve: "CVE-2024-99999",
    cwe: "CWE-400",
    filePath: "package-lock.json",
    fixAvailable: true,
    id: "GHSA-005",
    repository: "acme/worker-service",
    scanner: "Dependabot",
    severity: "Medium",
    title: "Dependency vulnerable to resource exhaustion",
    updatedAt: "5 hours ago",
  },
  {
    cve: null,
    cwe: "CWE-798",
    filePath: "config/development.yml",
    fixAvailable: false,
    id: "SARIF-106",
    repository: "acme/customer-api",
    scanner: "SARIF",
    severity: "High",
    title: "Hard-coded credential detected",
    updatedAt: "Yesterday",
  },
  {
    cve: null,
    cwe: "CWE-22",
    filePath: "src/services/export-service.ts",
    fixAvailable: false,
    id: "GHSA-007",
    repository: "acme/customer-api",
    scanner: "CodeQL",
    severity: "Medium",
    title: "Potential path traversal in export path",
    updatedAt: "Yesterday",
  },
  {
    cve: "CVE-2025-65432",
    cwe: "CWE-502",
    filePath: "pom.xml",
    fixAvailable: true,
    id: "GHSA-008",
    repository: "acme/reporting-service",
    scanner: "Dependabot",
    severity: "Low",
    title: "Insecure deserialization dependency",
    updatedAt: "2 days ago",
  },
];

export const mockFindingSummary = {
  total: 18,
  critical: 2,
  high: 5,
  autoFixAvailable: 7,
};
