export interface PatchRequest {
  finding: {
    title: string;
    severity: string;
    description: string;
    cwe?: string;
    cve?: string;
  };

  filePath: string;

  sourceCode: string;
}

export interface PatchResponse {
  explanation: string;

  confidence: number;

  patchedCode: string;

  diff: string;
}