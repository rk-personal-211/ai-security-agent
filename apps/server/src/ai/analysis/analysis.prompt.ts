import { SecurityFinding } from "./analysis.types.js";

export function buildAnalysisPrompt(
  finding: SecurityFinding
) {
  return `
You are a senior application security engineer.

Analyze the following security finding.

Finding

Title:
${finding.title}

Severity:
${finding.severity}

Description:
${finding.description}

Scanner:
${finding.scanner}

Source:
${finding.source}

File:
${finding.file}

CWE:
${finding.cwe ?? "N/A"}

CVE:
${finding.cve ?? "N/A"}

Return ONLY valid JSON.

Schema

{
  "summary":"",
  "rootCause":"",
  "businessImpact":"",
  "attackScenario":"",
  "recommendation":"",
  "confidence":95,
  "references":[]
}
`;
}