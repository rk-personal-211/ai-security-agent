export interface SecurityFinding {
  id: string;
  title: string;
  severity: string;
  description: string;
  scanner: string;
  source: string;
  file: string;
  cwe?: string;
  cve?: string;
}

export interface AIAnalysis {
  summary: string;
  rootCause: string;
  businessImpact: string;
  attackScenario: string;
  recommendation: string;
  confidence: number;
  references: string[];
}