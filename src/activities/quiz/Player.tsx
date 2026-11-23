import { useMemo, useState } from 'react';
import type { PlayerProps } from '../../core/types';
import { getQuestionModule } from './questions';
import { gradeQuiz } from './grading';
import type { QuizData, QuizResult } from './schema';

export default function QuizPlayer({
  data,
  config,
  activityId,
  onFinish,
}: PlayerProps<QuizData, QuizResult>) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [startedAt] = useState(() => Date.now());
  const [showResult, setShowResult] = useState(false);

  const question = data.questions[index];
  const mod = useMemo(() => (question ? getQuestionModule(question.type) : undefined), [question]);
  const answered = mod ? mod.isAnswered(question, answers[question.id]) : false;

  if (!question || !mod) {
    return <p role="alert">Không tìm thấy loại câu hỏi được hỗ trợ.</p>;
  }

  const isLast = index === data.questions.length - 1;

  const finish = () => {
    const result: QuizResult = {
      answers: gradeQuiz(data, answers),
      durationMs: Date.now() - startedAt,
    };
    setShowResult(true);
    onFinish(result);
  };

  return (
    <section aria-labelledby={`${activityId}-title`} className="space-y-5">
      <header className="space-y-1">
        <p className="text-sm text-slate-500">
          Câu {index + 1}/{data.questions.length}
          {config?.mode === 'exam' ? ' · Chế độ thi' : config?.mode === 'practice' ? ' · Luyện tập' : ' · Làm lại câu sai'}
        </p>
        <h2 id={`${activityId}-title`} className="text-xl font-semibold">
          {data.title}
        </h2>
      </header>

      <div className="space-y-4 rounded-xl border bg-white p-4 dark:bg-slate-900">
        <p className="whitespace-pre-wrap font-medium">{question.prompt}</p>
        {question.image ? (
          <img src={question.image} alt="" className="max-h-64 rounded-lg" loading="lazy" />
        ) : null}
        <mod.Renderer
          question={question}
          value={answers[question.id]}
          disabled={showResult}
          onChange={(value) => setAnswers((previous) => ({ ...previous, [question.id]: value }))}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Quay lại
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={finish}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white"
          >
            Nộp bài
          </button>
        ) : (
          <button
            type="button"
            disabled={!answered}
            onClick={() => setIndex((current) => Math.min(data.questions.length - 1, current + 1))}
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white disabled:opacity-40"
          >
            Tiếp theo
          </button>
        )}
      </div>
    </section>
  );
}
