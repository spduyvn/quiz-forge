import { z } from 'zod';
export const sortingGameDataSchema = z.object({ title: z.string().min(1), groups: z.array(z.object({ id: z.string(), name: z.string().min(1) })).min(2), items: z.array(z.object({ id: z.string(), text: z.string().min(1), groupId: z.string() })).min(1) });
export type SortingGameData = z.infer<typeof sortingGameDataSchema>;
export interface SortingGameResult { correct: number; total: number; durationMs: number; }
