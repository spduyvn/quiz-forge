import { z } from 'zod';
export const wordScrambleDataSchema = z.object({ title: z.string().min(1), words: z.array(z.object({ id: z.string(), word: z.string().min(1), hint: z.string().optional() })).min(1) });
export type WordScrambleData = z.infer<typeof wordScrambleDataSchema>;
export interface WordScrambleResult { solved: number; total: number; durationMs: number; }
export function scrambleWord(word: string, seed = Math.random) { const letters = word.split(''); for (let i = letters.length - 1; i > 0; i -= 1) { const j = Math.floor(seed() * (i + 1)); [letters[i], letters[j]] = [letters[j], letters[i]]; } return letters.join(''); }
