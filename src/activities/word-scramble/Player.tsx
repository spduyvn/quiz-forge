import { useMemo, useState, type FormEvent } from 'react';
import type { PlayerProps } from '../../core/types';
import { scrambleWord, type WordScrambleData, type WordScrambleResult } from './schema';

export default function WordScramblePlayer({ data, onFinish }: PlayerProps<WordScrambleData, WordScrambleResult>) {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [solved, setSolved] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const word = data.words[index];
  const scrambled = useMemo(() => scrambleWord(word.word), [word]);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextSolved = solved + (guess.trim().toLowerCase() === word.word.toLowerCase() ? 1 : 0);
    if (index === data.words.length - 1) onFinish({ solved: nextSolved, total: data.words.length, durationMs: Date.now() - startedAt });
    else { setSolved(nextSolved); setIndex((value) => value + 1); setGuess(''); }
  };
  return <form onSubmit={submit} className="space-y-4"><h2 className="text-xl font-semibold">{data.title}</h2><p className="text-sm text-slate-500">Từ {index + 1}/{data.words.length}</p><p className="rounded-lg border bg-white p-4 text-center text-2xl tracking-widest dark:bg-slate-900">{scrambled}</p>{word.hint ? <p className="text-sm">Gợi ý: {word.hint}</p> : null}<input className="w-full rounded-lg border p-3" value={guess} onChange={(event) => setGuess(event.target.value)} aria-label="Đoán từ" autoFocus /><button className="rounded-lg bg-indigo-600 px-4 py-2 text-white">Tiếp tục</button></form>;
}
