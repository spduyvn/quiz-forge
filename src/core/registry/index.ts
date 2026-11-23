import type { ActivityModule, AnyActivityModule } from '../types';

const modules = new Map<string, AnyActivityModule>();

// Vite tự phát hiện mọi plugin trong src/activities/*/index.ts.
// Core không được import trực tiếp activity cụ thể nào.
const discovered = import.meta.glob<{ default: ActivityModule }>('../../activities/*/index.ts', {
  eager: true,
});

for (const [path, chunk] of Object.entries(discovered)) {
  const module = chunk.default as AnyActivityModule | undefined;
  if (!module?.kind) {
    throw new Error(`Activity module tại ${path} thiếu thuộc tính "kind".`);
  }
  if (modules.has(module.kind)) {
    throw new Error(`Activity kind "${module.kind}" bị đăng ký trùng tại ${path}.`);
  }
  modules.set(module.kind, module);
}

export function getActivityModule(kind: string): AnyActivityModule | undefined {
  return modules.get(kind);
}

export function listActivityModules(): AnyActivityModule[] {
  return [...modules.values()];
}

export type { ActivityModule, AnyActivityModule };
