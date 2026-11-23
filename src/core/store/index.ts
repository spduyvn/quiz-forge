import { create } from 'zustand';
import type { LoadResult, ResultSummary } from '../types';

interface ContentState {
  content: LoadResult | null;
  history: ResultSummary[];
  setContent: (content: LoadResult) => void;
  addResult: (result: ResultSummary) => void;
}

export const useContentStore = create<ContentState>((set) => ({
  content: null,
  history: [],
  setContent: (content) => set({ content }),
  addResult: (result) => set((state) => ({ history: [result, ...state.history].slice(0, 100) })),
}));
