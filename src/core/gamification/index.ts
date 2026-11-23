import type { ResultSummary } from '../types';

export interface GamificationState {
  xp: number;
  streak: number;
  lastPlayedDate?: string;
  badges: string[];
}

export function applyResult(state: GamificationState, result: ResultSummary, today = new Date()): GamificationState {
  const date = today.toISOString().slice(0, 10);
  const previous = state.lastPlayedDate;
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const wasYesterday = previous === yesterday.toISOString().slice(0, 10);
  const nextStreak = previous === date ? state.streak : wasYesterday ? state.streak + 1 : 1;
  const badges = new Set(state.badges);
  if (result.percent >= 100) badges.add('perfect-score');
  if (nextStreak >= 7) badges.add('week-streak');
  return { xp: state.xp + Math.max(0, result.score) * 10, streak: nextStreak, lastPlayedDate: date, badges: [...badges] };
}
