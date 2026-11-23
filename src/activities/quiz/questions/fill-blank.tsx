import { fillBlankSchema, normalizeText, type FillBlankQuestion } from '../schema';
import { registerQuestionModule } from './registry';

function Renderer({
  question,
  value,
  onChange,
  disabled,
}: {
  question: FillBlankQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  return (
    <input
      type="text"
      value={typeof value === 'string' ? value : ''}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
      placeholder={question.hint ?? 'Nhập câu trả lời'}
      aria-label="Câu trả lời"
      className="w-full rounded-lg border px-3 py-2"
    />
  );
}

registerQuestionModule({
  type: 'fill_blank',
  schema: fillBlankSchema,
  label: { vi: 'Điền vào chỗ trống', en: 'Fill in the blank' },
  Renderer,
  grade: (question, value) => {
    if (typeof value !== 'string') return false;
    return question.acceptedAnswers.some((answer) =>
      question.caseSensitive ? value.trim() === answer.trim() : normalizeText(value) === normalizeText(answer),
    );
  },
  isAnswered: (_question, value) => typeof value === 'string' && value.trim().length > 0,
});
