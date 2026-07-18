import type { NormalizedFinding } from "@security-agent/shared";

export interface ScannerMetadata {
  id: string;
  name: string;
  version: string;
}

/**
 * Converts a scanner-specific report into the application finding contract.
 */
export interface ScannerAdapter<TRawFinding> {
  getFindings(): Promise<TRawFinding[]>;
  normalize(finding: TRawFinding): NormalizedFinding;
  metadata(): ScannerMetadata;
}
