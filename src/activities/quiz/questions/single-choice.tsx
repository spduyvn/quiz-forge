import { singleChoiceSchema, type SingleChoiceQuestion } from '../schema';
import { registerQuestionModule } from './registry';

function Renderer({
  question,
  value,
  onChange,
  disabled,
}: {
  question: SingleChoiceQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="sr-only">Chọn một đáp án</legend>
      {question.options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <input
            type="radio"
            name={question.id}
            value={option.id}
            checked={value === option.id}
            onChange={() => onChange(option.id)}
          />
          <span>{option.text}</span>
        </label>
      ))}
    </fieldset>
  );
}

registerQuestionModule({
  type: 'single_choice',
  schema: singleChoiceSchema,
  label: { vi: 'Một đáp án', en: 'Single choice' },
  Renderer,
  grade: (question, value) => value === question.correctOptionId,
  isAnswered: (_question, value) => typeof value === 'string' && value.length > 0,
});
