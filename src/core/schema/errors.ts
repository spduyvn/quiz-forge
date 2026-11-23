import type { ZodError } from 'zod';

export function formatZodError(error: ZodError, basePath = ''): string[] {
  return error.issues.map((issue) => {
    const path = [...basePath.split('.').filter(Boolean), ...issue.path.map(String)].join('.');
    return path ? `${path}: ${issue.message}` : issue.message;
  });
}
