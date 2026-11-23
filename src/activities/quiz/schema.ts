import { z } from 'zod';
import type { Lang } from '../../core/types';

const imageUrl = z
  .string()
  .refine(
    (value) => value.startsWith('https://') || value.startsWith('data:image/'),
    'chỉ chấp nhận URL https hoặc data URI hình ảnh',
  );

export const difficultySchema = z.enum(['easy', 'medium', 'hard']);

const questionBase = z.object({
  id: z.string().min(1),
  prompt: z.string().min(1, 'không được để trống'),
  explanation: z.string().optional(),
  difficulty: difficultySchema.optional(),
  tags: z.array(z.string()).optional(),
  source: z.string().optional(),
  image: imageUrl.optional(),
  points: z.number().positive().optional(),
});

export const singleChoiceSchema = questionBase.extend({
  type: z.literal('single_choice'),
  options: z.array(z.object({ id: z.string(), text: z.string().min(1) })).min(2),
  correctOptionId: z.string(),
});

export const multipleChoiceSchema = questionBase.extend({
  type: z.literal('multiple_choice'),
  options: z.array(z.object({ id: z.string(), text: z.string().min(1) })).min(2),
  correctOptionIds: z.array(z.string()).min(2),
});

export const trueFalseSchema = questionBase.extend({
  type: z.literal('true_false'),
  correct: z.boolean(),
});

export const fillBlankSchema = questionBase.extend({
  type: z.literal('fill_blank'),
  acceptedAnswers: z.array(z.string().min(1)).min(1),
  caseSensitive: z.boolean().optional(),
  hint: z.string().optional(),
});

export const matchingSchema = questionBase.extend({
  type: z.literal('matching'),
  pairs: z.array(z.object({ left: z.string().min(1), right: z.string().min(1) })).min(2),
});

export const questionSchema = z.discriminatedUnion('type', [
  singleChoiceSchema,
  multipleChoiceSchema,
  trueFalseSchema,
  fillBlankSchema,
  matchingSchema,
]);

export type Question = z.infer<typeof questionSchema>;
export type SingleChoiceQuestion = z.infer<typeof singleChoiceSchema>;
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceSchema>;
export type TrueFalseQuestion = z.infer<typeof trueFalseSchema>;
export type FillBlankQuestion = z.infer<typeof fillBlankSchema>;
export type MatchingQuestion = z.infer<typeof matchingSchema>;

export const quizConfigSchema = z.object({
  mode: z.enum(['exam', 'practice', 'retry_wrong']).default('practice'),
  shuffleQuestions: z.boolean().optional(),
  shuffleOptions: z.boolean().optional(),
  timeLimitSec: z.number().positive().optional(),
});

export const quizDataSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, 'phải có ít nhất một câu hỏi'),
});

export type QuizConfig = z.infer<typeof quizConfigSchema>;
export type QuizData = z.infer<typeof quizDataSchema>;

export interface QuizAnswer {
  questionId: string;
  value: unknown;
  correct: boolean;
  score: number;
  maxScore: number;
  tags: string[];
}

export interface QuizResult {
  answers: QuizAnswer[];
  durationMs: number;
}

export type QuestionType = Question['type'];

export function getQuestionPoints(question: Question): number {
  return question.points ?? 1;
}

export function normalizeText(value: string, lang: Lang = 'vi'): string {
  return value.trim().toLocaleLowerCase(lang);
}
