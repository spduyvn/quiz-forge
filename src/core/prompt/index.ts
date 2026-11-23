import { zodToJsonSchema } from 'zod-to-json-schema';
import type { ActivityModule, Lang } from '../types';

export interface PromptOptions {
  module: ActivityModule;
  topic: string;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard';
  lang: Lang;
}

export function buildAiPrompt({ module, topic, count, difficulty, lang }: PromptOptions): string {
  const schema = zodToJsonSchema(module.dataSchema, { name: 'ActivityData', $refStrategy: 'none' });
  const languageLine = lang === 'vi' ? 'Viết nội dung bằng tiếng Việt.' : 'Write the content in English.';
  return [
    module.aiPrompt.instructions,
    languageLine,
    `Chủ đề: ${topic}. Số lượng mục: ${count}. Độ khó: ${difficulty}.`,
    'Trả về đúng một đối tượng JSON khớp JSON Schema dưới đây, không kèm giải thích.',
    JSON.stringify(schema, null, 2),
    'Ví dụ dữ liệu hợp lệ:',
    JSON.stringify(module.aiPrompt.example, null, 2),
  ].join('\n\n');
}
