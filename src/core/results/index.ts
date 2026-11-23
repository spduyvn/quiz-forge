import type { ResultSummary } from '../types';

export function normalizeResult(result: ResultSummary): ResultSummary {
  const maxScore = Math.max(0, result.maxScore);
  const score = Math.min(Math.max(0, result.score), maxScore);
  return {
    ...result,
    score,
    maxScore,
    percent: maxScore === 0 ? 0 : Math.round((score / maxScore) * 100),
    completedAt: result.completedAt || new Date().toISOString(),
  };
}
