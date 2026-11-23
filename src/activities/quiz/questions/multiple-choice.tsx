import { multipleChoiceSchema, type MultipleChoiceQuestion } from '../schema';
import { registerQuestionModule } from './registry';

function Renderer({
  question,
  value,
  onChange,
  disabled,
}: {
  question: MultipleChoiceQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  const selected = Array.isArray(value) ? (value as string[]) : [];
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  };

  return (
    <fieldset className="space-y-2" disabled={disabled}>
      <legend className="sr-only">Chọn các đáp án đúng</legend>
      {question.options.map((option) => (
        <label
          key={option.id}
          className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <input
            type="checkbox"
            checked={selected.includes(option.id)}
            onChange={() => toggle(option.id)}
          />
          <span>{option.text}</span>
        </label>
      ))}
    </fieldset>
  );
}

registerQuestionModule({
  type: 'multiple_choice',
  schema: multipleChoiceSchema,
  label: { vi: 'Nhiều đáp án', en: 'Multiple choice' },
  Renderer,
  grade: (question, value) => {
    if (!Array.isArray(value)) return false;
    const selected = [...(value as string[])].sort();
    const expected = [...question.correctOptionIds].sort();
    return selected.length === expected.length && selected.every((id, i) => id === expected[i]);
  },
  isAnswered: (_question, value) => Array.isArray(value) && value.length > 0,
});
