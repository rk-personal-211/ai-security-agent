import { normalizedFindingSchema, type NormalizedFinding } from "@security-agent/shared";

import type { ScannerAdapter, ScannerMetadata } from "./scanner-adapter.js";

interface DependabotFinding {
  advisory: { cve: string; description: string; ghsaId: string; severity: "critical" | "high" | "medium" | "low" };
  dependency: { manifestPath: string; packageName: string };
  alertNumber: number;
}

const mockDependabotFindings: DependabotFinding[] = [
  {
    advisory: {
      cve: "CVE-2025-12345",
      description: "The installed package version allows crafted requests to bypass validation.",
      ghsaId: "GHSA-mock-1234",
      severity: "high",
    },
    alertNumber: 7,
    dependency: { manifestPath: "package.json", packageName: "example-vulnerable-package" },
  },
];

export const dependabotScannerAdapter: ScannerAdapter<DependabotFinding> = {
  async getFindings(): Promise<DependabotFinding[]> {
    return mockDependabotFindings;
  },

  metadata(): ScannerMetadata {
    return { id: "dependabot", name: "Dependabot", version: "mock-v1" };
  },

  normalize(finding: DependabotFinding): NormalizedFinding {
    return normalizedFindingSchema.parse({
      id: `dependabot-${finding.alertNumber}`,
      scanner: this.metadata().name,
      ruleId: finding.advisory.ghsaId,
      title: `Vulnerable dependency: ${finding.dependency.packageName}`,
      description: `${finding.advisory.description} ${finding.advisory.cve}`,
      severity: finding.advisory.severity,
      filePath: finding.dependency.manifestPath,
      startLine: 1,
      remediation: `Upgrade ${finding.dependency.packageName} to a version that resolves ${finding.advisory.ghsaId}.`,
    });
  },
};
