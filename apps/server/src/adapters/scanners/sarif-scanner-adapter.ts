import { normalizedFindingSchema, type NormalizedFinding } from "@security-agent/shared";

import type { ScannerAdapter, ScannerMetadata } from "./scanner-adapter.js";

interface SarifFinding {
  level: "error" | "warning" | "note";
  message: string;
  ruleId: string;
  location: { endLine?: number; filePath: string; startLine: number };
}

const severityBySarifLevel = {
  error: "high",
  warning: "medium",
  note: "low",
} as const;

const mockSarifFindings: SarifFinding[] = [
  {
    level: "warning",
    message: "The redirect URL is derived from request input without allowlist validation.",
    ruleId: "web/open-redirect",
    location: { endLine: 18, filePath: "src/routes/login.ts", startLine: 18 },
  },
];

export const sarifScannerAdapter: ScannerAdapter<SarifFinding> = {
  async getFindings(): Promise<SarifFinding[]> {
    return mockSarifFindings;
  },

  metadata(): ScannerMetadata {
    return { id: "sarif", name: "SARIF Upload", version: "2.1.0-mock" };
  },

  normalize(finding: SarifFinding): NormalizedFinding {
    return normalizedFindingSchema.parse({
      id: `sarif-${finding.ruleId}-${finding.location.startLine}`,
      scanner: this.metadata().name,
      ruleId: finding.ruleId,
      title: "Unvalidated redirect target",
      description: finding.message,
      severity: severityBySarifLevel[finding.level],
      filePath: finding.location.filePath,
      startLine: finding.location.startLine,
      endLine: finding.location.endLine,
      remediation: "Allow redirects only to approved destinations.",
    });
  },
};
