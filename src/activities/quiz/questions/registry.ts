import type { Question } from '../schema';
import type { AnyQuestionModule, QuestionModule } from './types';

const registry = new Map<Question['type'], AnyQuestionModule>();

export function registerQuestionModule<T extends Question>(module: QuestionModule<T>) {
  if (registry.has(module.type)) {
    throw new Error(`Question type "${module.type}" bị đăng ký trùng.`);
  }
  registry.set(module.type, module as unknown as AnyQuestionModule);
}

export function getQuestionModule(type: Question['type']): AnyQuestionModule | undefined {
  return registry.get(type);
}

export function listQuestionModules(): AnyQuestionModule[] {
  return [...registry.values()];
}

export function gradeQuestion(question: Question, value: unknown): boolean {
  return registry.get(question.type)?.grade(question, value) ?? false;
}

export function isQuestionAnswered(question: Question, value: unknown): boolean {
  return registry.get(question.type)?.isAnswered(question, value) ?? false;
}
