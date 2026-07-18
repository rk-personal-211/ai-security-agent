import { ChatRequest } from "./chat.types.js";

export function buildChatPrompt(
  request: ChatRequest
) {
  return `
You are a senior application security engineer.

Use the finding and previous AI analysis to answer the user's question.

Finding

Title:
${request.finding.title}

Severity:
${request.finding.severity}

Description:
${request.finding.description}

CWE:
${request.finding.cwe ?? "N/A"}

CVE:
${request.finding.cve ?? "N/A"}

Previous Analysis

Summary:
${request.previousAnalysis?.summary ?? ""}

Root Cause:
${request.previousAnalysis?.rootCause ?? ""}

Recommendation:
${request.previousAnalysis?.recommendation ?? ""}

Question

${request.question}

Keep the answer concise, practical and developer focused.

Return plain text only.
`;
}