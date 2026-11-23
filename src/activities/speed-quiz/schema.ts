import { z } from 'zod';

export const speedQuizDataSchema = z.object({
  title: z.string().min(1),
  timeLimitSec: z.number().positive(),
  lives: z.number().int().min(1),
  questions: z.array(z.object({
    id: z.string(),
    prompt: z.string().min(1),
    choices: z.array(z.string().min(1)).min(2),
    correctIndex: z.number().int().min(0),
  }).superRefine((question, context) => {
    if (question.correctIndex >= question.choices.length) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['correctIndex'], message: 'phải trỏ đến một lựa chọn tồn tại' });
    }
  })).min(1),
});

export type SpeedQuizData = z.infer<typeof speedQuizDataSchema>;
export interface SpeedQuizResult { score: number; correct: number; total: number; bestCombo: number; livesLeft: number; durationMs: number; }
export function scoreAnswer(combo: number) { return 100 + Math.min(combo, 10) * 10; }
