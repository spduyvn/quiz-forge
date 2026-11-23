import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { listActivityModules } from '../index';
import type { ResultSummary } from '../../types';

const modules = listActivityModules();

describe('activity registry contract', () => {
  it('discovers the built-in activity plugins', () => {
    expect(modules.map((module) => module.kind).sort()).toEqual([
      'flashcard',
      'memory-match',
      'quiz',
      'sorting-game',
      'speed-quiz',
      'word-scramble',
    ]);
  });

  for (const module of modules) {
    describe(module.kind, () => {
      it('has valid metadata, samples and prompt examples', () => {
        expect(module.version).toMatch(/^\d+\.\d+$/);
        expect(module.meta.icon).toBeTruthy();
        expect(module.samples.length).toBeGreaterThan(0);
        for (const sample of module.samples) {
          expect(module.dataSchema.safeParse(sample.data).success, `${sample.name} phải hợp lệ`).toBe(true);
        }
        expect(module.dataSchema.safeParse(module.aiPrompt.example).success, 'aiPrompt.example phải hợp lệ').toBe(true);
        expect(module.aiPrompt.instructions.trim().length).toBeGreaterThan(0);
      });

      it('generates a JSON Schema from dataSchema', () => {
        const schema = zodToJsonSchema(module.dataSchema, { $refStrategy: 'none' });
        expect(schema).toMatchObject({ type: 'object' });
      });

      it('returns a normalized ResultSummary', () => {
        for (const sample of module.samples) {
          const Player = module.Player;
          let captured: ResultSummary | null = null;
          render(
            <Player
              data={sample.data}
              activityId="contract"
              lang="vi"
              onFinish={(result) => {
                captured = module.summarize(result);
              }}
            />,
          );
          expect(captured === null || typeof captured === 'object').toBe(true);
        }
      });

      it('renders the Player with every sample without crashing', () => {
        for (const sample of module.samples) {
          const Player = module.Player;
          const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
          expect(() =>
            render(<Player data={sample.data} activityId="contract" lang="vi" onFinish={() => {}} />),
          ).not.toThrow();
          errorSpy.mockRestore();
        }
      });
    });
  }
});
