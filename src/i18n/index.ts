import type { Lang } from '../core/types';

export const translations: Record<Lang, Record<string, string>> = {
  vi: { load: 'Mở nội dung', lesson: 'Bài học', prompt: 'Tạo prompt AI', back: 'Quay lại' },
  en: { load: 'Open content', lesson: 'Lesson', prompt: 'Create AI prompt', back: 'Back' },
};

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? translations.vi[key] ?? key;
}
