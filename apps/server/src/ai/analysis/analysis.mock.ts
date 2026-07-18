// apps/api/src/ai/analysis/analysis.mock.ts

import { AIAnalysis, SecurityFinding } from "./analysis.types.js";

const sqlInjection: AIAnalysis = {
  summary: "User-controlled input is directly used inside SQL queries.",

  rootCause:
    "The application concatenates untrusted input into SQL statements instead of using parameterized queries.",

  businessImpact:
    "Attackers can extract, modify, or delete sensitive database records.",

  attackScenario:
    "An attacker submits malicious SQL through a request parameter and bypasses application logic.",

  recommendation:
    "Replace string concatenation with parameterized queries or prepared statements.",

  confidence: 98,

  references: [
    "https://owasp.org/www-community/attacks/SQL_Injection",
    "https://cwe.mitre.org/data/definitions/89.html",
  ],
};

const xss: AIAnalysis = {
  summary: "User-controlled HTML is rendered without sanitization.",

  rootCause: "The application outputs unescaped user input directly into HTML.",

  businessImpact:
    "Attackers can execute JavaScript inside another user's browser.",

  attackScenario: "A malicious script is stored or reflected back to victims.",

  recommendation: "Escape user input and sanitize HTML before rendering.",

  confidence: 95,

  references: ["https://owasp.org/www-community/attacks/xss/"],
};

const dependency: AIAnalysis = {
  summary: "The project contains a vulnerable third-party dependency.",

  rootCause:
    "A package version contains publicly known security vulnerabilities.",

  businessImpact:
    "Applications may become vulnerable through indirect dependency exploitation.",

  attackScenario: "Attackers exploit a published CVE affecting the dependency.",

  recommendation: "Upgrade to the latest patched version.",

  confidence: 97,

  references: ["https://github.com/advisories"],
};

const fallback: AIAnalysis = {
  summary: "AI analysis is unavailable for this vulnerability.",

  rootCause: "No specialized mock response exists.",

  businessImpact: "Unknown.",

  attackScenario: "Unknown.",

  recommendation: "Perform manual security review.",

  confidence: 70,

  references: [],
};

export function getMockAnalysis(finding: SecurityFinding): AIAnalysis {
  const title = finding.title.toLowerCase();

  if (title.includes("sql")) {
    return sqlInjection;
  }

  if (title.includes("cross") || title.includes("xss")) {
    return xss;
  }

  if (title.includes("dependency") || title.includes("dependabot")) {
    return dependency;
  }

  return fallback;
}
