export interface ChatRequest {
  finding: {
    title: string;
    severity: string;
    description: string;
    cwe?: string;
    cve?: string;
  };

  question: string;

  previousAnalysis?: {
    summary: string;
    rootCause: string;
    recommendation: string;
  };
}

export interface ChatResponse {
  answer: string;
}
