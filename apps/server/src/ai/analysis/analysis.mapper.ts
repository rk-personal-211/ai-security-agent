// apps/api/src/ai/analysis/analysis.mapper.ts

import { AIAnalysis, SecurityFinding } from "./analysis.types.js"

export function mapFindingToPrompt(finding: SecurityFinding) {
  return {
    title: finding.title,
    severity: finding.severity,
    description: finding.description,
    scanner: finding.scanner,
    cwe: finding.cwe,
    cve: finding.cve,
    file: finding.file,
  };
}

export function mapAIResponse(analysis: AIAnalysis): AIAnalysis {
  return analysis;
}
