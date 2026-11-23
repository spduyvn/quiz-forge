import { useState } from 'react';
import type { PlayerProps } from '../../core/types';
import type { FlashcardData, FlashcardRating, FlashcardResult } from './schema';

export default function FlashcardPlayer({ data, onFinish }: PlayerProps<FlashcardData, FlashcardResult>) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const card = data.cards[index];
  const rate = (rating: FlashcardRating) => {
    const nextKnown = known + (rating === 'known' ? 1 : 0);
    if (index === data.cards.length - 1) onFinish({ known: nextKnown, total: data.cards.length, durationMs: Date.now() - startedAt });
    else { setKnown(nextKnown); setIndex((value) => value + 1); setFlipped(false); }
  };
  return <section className="space-y-4" aria-labelledby="flashcard-title">
    <h2 id="flashcard-title" className="text-xl font-semibold">{data.title}</h2>
    <p className="text-sm text-slate-500">Thẻ {index + 1}/{data.cards.length}</p>
    <button type="button" className="min-h-48 w-full rounded-xl border bg-white p-8 text-xl shadow-sm dark:bg-slate-900" onClick={() => setFlipped((value) => !value)} aria-label="Lật thẻ">
      {flipped ? card.back : card.front}
    </button>
    {flipped ? <div className="flex justify-center gap-3"><button type="button" className="rounded-lg border px-4 py-2" onClick={() => rate('unknown')}>Chưa biết</button><button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-white" onClick={() => rate('known')}>Biết</button></div> : <p className="text-center text-sm">Chạm vào thẻ để lật</p>}
  </section>;
}
