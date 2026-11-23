import { useCallback, useEffect, useRef, useState } from 'react';
import type { PlayerProps } from '../../core/types';
import { scoreAnswer, type SpeedQuizData, type SpeedQuizResult } from './schema';

export default function SpeedQuizPlayer({ data, onFinish }: PlayerProps<SpeedQuizData, SpeedQuizResult>) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [lives, setLives] = useState(data.lives);
  const [remaining, setRemaining] = useState(data.timeLimitSec);
  const [startedAt] = useState(() => Date.now());
  const completedRef = useRef(false);
  const question = data.questions[index];
  const finished = remaining <= 0 || lives <= 0 || index >= data.questions.length;

  const complete = useCallback((finalScore: number, correct: number, best: number, livesLeft: number) => {
    if (completedRef.current) return;
    completedRef.current = true;
    onFinish({ score: finalScore, correct, total: data.questions.length, bestCombo: best, livesLeft, durationMs: Date.now() - startedAt });
  }, [onFinish, data.questions.length, startedAt]);

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [finished]);

  useEffect(() => {
    if (remaining === 0) complete(score, index, bestCombo, lives);
  }, [remaining, score, index, bestCombo, lives, complete]);

  const choose = (choiceIndex: number) => {
    if (finished) return;
    const correct = choiceIndex === question.correctIndex;
    const nextCombo = correct ? combo + 1 : 0;
    const nextScore = score + (correct ? scoreAnswer(combo) : 0);
    const nextLives = lives - (correct ? 0 : 1);
    const nextBest = Math.max(bestCombo, nextCombo);
    setScore(nextScore); setCombo(nextCombo); setBestCombo(nextBest); setLives(nextLives);
    if (index + 1 >= data.questions.length || nextLives <= 0) {
      complete(nextScore, correct ? index + 1 : index, nextBest, Math.max(0, nextLives));
    } else {
      setIndex((value) => value + 1);
    }
  };

  if (finished && index >= data.questions.length) return <p className="text-center">Hoàn thành! Điểm: {score}</p>;

  return (
    <section className="space-y-4">
      <header className="flex flex-wrap justify-between gap-2">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p aria-live="polite">⏱ {remaining}s · ❤️ {lives} · 🔥 {combo}x</p>
      </header>
      <div className="h-2 overflow-hidden rounded bg-slate-200">
        <div className="h-full bg-indigo-600 transition-all" style={{ width: `${(remaining / data.timeLimitSec) * 100}%` }} />
      </div>
      <p className="text-lg font-medium">{question.prompt}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {question.choices.map((choice, choiceIndex) => (
          <button key={choice} type="button" onClick={() => choose(choiceIndex)} className="rounded-lg border p-3 text-left hover:border-indigo-500">
            {choice}
          </button>
        ))}
      </div>
    </section>
  );
}
