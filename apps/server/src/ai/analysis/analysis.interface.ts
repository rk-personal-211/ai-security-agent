import {
  AIAnalysis,
  SecurityFinding,
} from "./analysis.types.js";

export interface AIAnalysisService {
  analyzeFinding(
    finding: SecurityFinding
  ): Promise<AIAnalysis>;
}