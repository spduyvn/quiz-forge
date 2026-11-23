import { useMemo, useState } from 'react';
import type { PlayerProps } from '../../core/types';
import type { MemoryMatchData, MemoryMatchResult } from './schema';

type Card = { key: string; pairId: string; text: string };

function cardsFor(data: MemoryMatchData): Card[] {
  return data.pairs.flatMap((pair) => [{ key: `${pair.id}-c`, pairId: pair.id, text: pair.concept }, { key: `${pair.id}-d`, pairId: pair.id, text: pair.definition }]);
}

export default function MemoryMatchPlayer({ data, onFinish }: PlayerProps<MemoryMatchData, MemoryMatchResult>) {
  const cards = useMemo(() => cardsFor(data).sort(() => Math.random() - 0.5), [data]);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const choose = (card: Card) => {
    if (open.includes(card.key) || matched.includes(card.pairId) || open.length >= 2) return;
    const next = [...open, card.key];
    setOpen(next);
    if (next.length === 2) {
      setMoves((value) => value + 1);
      const selected = cards.filter((item) => next.includes(item.key));
      if (selected[0].pairId === selected[1].pairId) {
        const nextMatched = [...matched, card.pairId];
        setMatched(nextMatched);
        setOpen([]);
        if (nextMatched.length === data.pairs.length) onFinish({ moves: moves + 1, durationMs: Date.now() - startedAt });
      } else window.setTimeout(() => setOpen([]), 650);
    }
  };
  return <section className="space-y-4"><header><h2 className="text-xl font-semibold">{data.title}</h2><p className="text-sm text-slate-500">Lượt: {moves}</p></header><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{cards.map((card) => { const visible = open.includes(card.key) || matched.includes(card.pairId); return <button key={card.key} type="button" aria-label={visible ? card.text : 'Thẻ úp'} onClick={() => choose(card)} className="min-h-24 rounded-lg border p-3 text-sm">{visible ? card.text : '?'}</button>; })}</div></section>;
}
