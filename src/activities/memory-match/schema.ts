import { z } from 'zod';

export const memoryMatchDataSchema = z.object({
  title: z.string().min(1),
  pairs: z.array(z.object({ id: z.string().min(1), concept: z.string().min(1), definition: z.string().min(1) })).min(2),
});
export type MemoryMatchData = z.infer<typeof memoryMatchDataSchema>;
export interface MemoryMatchResult { moves: number; durationMs: number; }
