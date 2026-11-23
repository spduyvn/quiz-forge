import { useMemo, useState } from 'react';
import { useAudio } from '../../core/audio';
import type { PlayerProps } from '../../core/types';
import { getQuestionModule } from './questions';
import { calculateQuizScore, gradeQuiz, summarizeTags } from './grading';
import type { QuizData, QuizResult } from './schema';

function formatDuration(durationMs: number): string {
  return `${Math.round(durationMs / 1000)} giây`;
}

export default function QuizPlayer({ data, config, activityId, onFinish }: PlayerProps<QuizData, QuizResult>) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [result, setResult] = useState<QuizResult | null>(null);
  const { playEffect } = useAudio();

  const question = data.questions[index];
  const mod = useMemo(() => (question ? getQuestionModule(question.type) : undefined), [question]);
  if (!question || !mod) {
    return <p role="alert">Không tìm thấy loại câu hỏi được hỗ trợ.</p>;
  }

  const finish = () => {
    if (result) return;
    const nextResult: QuizResult = {
      answers: gradeQuiz(data, answers),
      durationMs: Date.now() - startedAt,
    };
    setResult(nextResult);
    playEffect('complete');
    onFinish(nextResult);
  };

  const retry = () => {
    setIndex(0);
    setAnswers({});
    setStartedAt(Date.now());
    setResult(null);
  };

  if (result) {
    const score = calculateQuizScore(result.answers);
    const correct = result.answers.filter((answer) => answer.correct).length;
    return (
      <section aria-labelledby={`${activityId}-result`} className="space-y-5">
        <header className="space-y-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Đã nộp bài</p>
          <h2 id={`${activityId}-result`} className="text-2xl font-bold">Kết quả của bạn</h2>
          <p className="text-4xl font-bold text-indigo-600">{score.percent}%</p>
          <p>{score.score}/{score.maxScore} điểm · {correct}/{data.questions.length} câu đúng · {formatDuration(result.durationMs)}</p>
        </header>
        <div className="grid gap-2 sm:grid-cols-2">
          {summarizeTags(result.answers).map((tag) => (
            <div key={tag.tag} className="rounded-lg border p-3">
              <div className="flex justify-between text-sm"><span>{tag.tag}</span><strong>{tag.correct}/{tag.total}</strong></div>
              <div className="mt-2 h-2 rounded bg-slate-200"><div className="h-full rounded bg-indigo-500" style={{ width: `${tag.total === 0 ? 0 : (tag.correct / tag.total) * 100}%` }} /></div>
            </div>
          ))}
        </div>
        <button type="button" onClick={retry} className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">Làm lại bài</button>
      </section>
    );
  }

  const isLast = index === data.questions.length - 1;
  return (
    <section aria-labelledby={`${activityId}-title`} className="space-y-5">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">
          Câu {index + 1}/{data.questions.length}
          {config?.mode === 'exam' ? ' · Chế độ thi' : config?.mode === 'practice' ? ' · Luyện tập' : ' · Làm lại câu sai'}
        </p>
        <h2 id={`${activityId}-title`} className="text-xl font-semibold">{data.title}</h2>
      </header>

      <div className="space-y-4 rounded-xl border bg-white p-4 dark:bg-slate-900">
        <p className="whitespace-pre-wrap font-medium">{question.prompt}</p>
        {question.image ? <img src={question.image} alt="" className="max-h-64 rounded-lg" loading="lazy" /> : null}
        <mod.Renderer
          question={question}
          value={answers[question.id]}
          onChange={(value) => setAnswers((previous) => ({ ...previous, [question.id]: value }))}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" disabled={index === 0} onClick={() => setIndex((current) => Math.max(0, current - 1))} className="rounded-lg border px-4 py-2 disabled:opacity-40">Quay lại</button>
        <div className="flex flex-wrap gap-2">
          {isLast ? null : (
            <button type="button" onClick={() => { playEffect(mod.grade(question, answers[question.id]) ? 'correct' : 'incorrect'); setIndex((current) => Math.min(data.questions.length - 1, current + 1)); }} className="rounded-lg border px-4 py-2">Tiếp theo</button>
          )}
          <button type="button" onClick={finish} className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white">Nộp bài</button>
        </div>
      </div>
    </section>
  );
}
