import { trueFalseSchema, type TrueFalseQuestion } from '../schema';
import { registerQuestionModule } from './registry';

function Renderer({
  value,
  onChange,
  disabled,
}: {
  question: TrueFalseQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-3" role="group" aria-label="Đúng hoặc sai">
      {[true, false].map((choice) => (
        <button
          key={String(choice)}
          type="button"
          disabled={disabled}
          aria-pressed={value === choice}
          onClick={() => onChange(choice)}
          className="rounded-lg border px-4 py-2 aria-pressed:border-indigo-600 aria-pressed:bg-indigo-50"
        >
          {choice ? 'Đúng' : 'Sai'}
        </button>
      ))}
    </div>
  );
}

registerQuestionModule({
  type: 'true_false',
  schema: trueFalseSchema,
  label: { vi: 'Đúng / Sai', en: 'True / False' },
  Renderer,
  grade: (question, value) => value === question.correct,
  isAnswered: (_question, value) => typeof value === 'boolean',
});
