import type { ComponentType, ReactNode } from 'react';
import type { ZodType } from 'zod';

export type Lang = 'vi' | 'en';

export type LocalizedText = Record<Lang, string>;

export interface ContentMeta {
  title: string;
  description?: string;
  language: Lang;
  author?: string;
  tags?: string[];
  cover?: string;
}

export interface ActivityEntry {
  id: string;
  kind: string;
  config?: Record<string, unknown>;
  data: unknown;
}

export interface ContentEnvelope {
  schema: string;
  version: string;
  meta: ContentMeta;
  activities: ActivityEntry[];
}

export interface TagScore {
  tag: string;
  correct: number;
  total: number;
}

export interface ResultSummary {
  activityId: string;
  kind: string;
  score: number;
  maxScore: number;
  percent: number;
  durationMs: number;
  completedAt: string;
  details: TagScore[];
}

export interface PlayerProps<TData, TResult> {
  data: TData;
  config?: Record<string, unknown>;
  activityId: string;
  lang: Lang;
  onFinish: (result: TResult) => void;
  onProgress?: (progress: number) => void;
}

export interface EditorProps<TData> {
  data: TData;
  onChange: (data: TData) => void;
  lang: Lang;
}

export interface SampleData<TData> {
  name: string;
  data: TData;
}

export interface AiPrompt<TData> {
  instructions: string;
  example: TData;
}

export interface ActivityModuleMeta {
  name: LocalizedText;
  description: LocalizedText;
  icon: ReactNode;
  tags: string[];
}

export interface ActivityModule<TData = unknown, TResult = unknown> {
  kind: string;
  version: string;
  meta: ActivityModuleMeta;
  dataSchema: ZodType<TData>;
  configSchema?: ZodType;
  migrate?: (data: unknown, fromVersion: string) => TData;
  Player: ComponentType<PlayerProps<TData, TResult>>;
  Editor?: ComponentType<EditorProps<TData>>;
  summarize: (result: TResult) => ResultSummary;
  samples: SampleData<TData>[];
  aiPrompt: AiPrompt<TData>;
  exporters?: Record<string, (data: TData) => Blob>;
}

export type AnyActivityModule = ActivityModule<unknown, unknown>;

export interface LoadedActivity<TData = unknown> {
  entry: ActivityEntry;
  module: ActivityModule<TData, unknown>;
  parsedData: TData;
}

export interface LoadIssue {
  activityId?: string;
  kind?: string;
  severity: 'error' | 'warning';
  message: string;
}

export interface LoadResult {
  envelope: ContentEnvelope;
  activities: LoadedActivity[];
  issues: LoadIssue[];
}

export interface QuestionResult {
  questionId: string;
  correct: boolean;
  score: number;
  maxScore: number;
  tags: string[];
}
