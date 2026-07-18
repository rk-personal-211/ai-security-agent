import { PatchRequest } from "./patch.types.js";

export function buildPatchPrompt(
  request: PatchRequest
) {
  return `
You are a senior application security engineer.

Fix the security vulnerability.

Finding

Title:
${request.finding.title}

Severity:
${request.finding.severity}

Description:
${request.finding.description}

File

${request.filePath}

Current Source Code

${request.sourceCode}

Requirements

Generate secure production-ready code.

Do not change unrelated code.

Return ONLY valid JSON.

Schema

{
    "explanation":"",
    "confidence":98,
    "patchedCode":"",
    "diff":""
}
`;
}