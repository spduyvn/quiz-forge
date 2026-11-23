import type { ComponentType } from 'react';
import type { ZodType, ZodTypeAny } from 'zod';
import type { Question, QuizConfig } from '../schema';

export interface QuestionRendererProps<T extends Question = Question> {
  question: T;
  disabled?: boolean;
  value: unknown;
  onChange: (value: unknown) => void;
}

export interface QuestionModule<T extends Question = Question> {
  type: T['type'];
  schema: ZodType<T>;
  label: Record<'vi' | 'en', string>;
  Renderer: ComponentType<QuestionRendererProps<T>>;
  grade(question: T, value: unknown): boolean;
  isAnswered(question: T, value: unknown): boolean;
}

export interface AnyQuestionModule {
  type: Question['type'];
  schema: ZodTypeAny;
  label: Record<'vi' | 'en', string>;
  Renderer: ComponentType<QuestionRendererProps>;
  grade(question: Question, value: unknown): boolean;
  isAnswered(question: Question, value: unknown): boolean;
}

export interface QuizPlayerContext {
  config: QuizConfig;
}
