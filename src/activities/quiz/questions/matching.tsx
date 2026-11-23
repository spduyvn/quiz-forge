import { matchingSchema, type MatchingQuestion } from '../schema';
import { registerQuestionModule } from './registry';

function Renderer({
  question,
  value,
  onChange,
  disabled,
}: {
  question: MatchingQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  const pairs = value && typeof value === 'object' ? (value as Record<string, string>) : {};
  return (
    <div className="space-y-3">
      {question.pairs.map((pair) => (
        <label key={pair.left} className="grid gap-2 sm:grid-cols-2 sm:items-center">
          <span>{pair.left}</span>
          <select
            disabled={disabled}
            value={pairs[pair.left] ?? ''}
            onChange={(event) => onChange({ ...pairs, [pair.left]: event.target.value })}
            aria-label={`Ghép ${pair.left}`}
            className="rounded-lg border px-3 py-2"
          >
            <option value="">Chọn định nghĩa</option>
            {question.pairs.map((candidate) => (
              <option key={candidate.right} value={candidate.right}>
                {candidate.right}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}

registerQuestionModule({
  type: 'matching',
  schema: matchingSchema,
  label: { vi: 'Ghép đôi', en: 'Matching' },
  Renderer,
  grade: (question, value) => {
    if (!value || typeof value !== 'object') return false;
    const answers = value as Record<string, string>;
    return question.pairs.every((pair) => answers[pair.left] === pair.right);
  },
  isAnswered: (question, value) => {
    if (!value || typeof value !== 'object') return false;
    const answers = value as Record<string, string>;
    return question.pairs.every((pair) => Boolean(answers[pair.left]));
  },
});
