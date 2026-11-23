import { get, set } from 'idb-keyval';
import type { ResultSummary } from '../types';

const HISTORY_KEY = 'quizforge:history';

export async function readHistory(): Promise<ResultSummary[]> {
  return (await get<ResultSummary[]>(HISTORY_KEY)) ?? [];
}

export async function appendHistory(result: ResultSummary): Promise<void> {
  const history = await readHistory();
  await set(HISTORY_KEY, [result, ...history].slice(0, 100));
}

export async function clearHistory(): Promise<void> {
  await set(HISTORY_KEY, []);
}
