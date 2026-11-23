import type { EditorProps } from '../../core/types';
import type { QuizData } from './schema';
import { listQuestionModules } from './questions';

export default function QuizEditor({ data, onChange }: EditorProps<QuizData>) {
  const updateQuestion = (index: number, prompt: string) => {
    const questions = data.questions.map((question, current) =>
      current === index ? { ...question, prompt } : question,
    );
    onChange({ ...data, questions });
  };

  return (
    <div className="space-y-4">
      <label className="block space-y-1">
        <span className="text-sm font-medium">Tiêu đề quiz</span>
        <input
          className="w-full rounded-lg border px-3 py-2"
          value={data.title}
          onChange={(event) => onChange({ ...data, title: event.target.value })}
        />
      </label>
      {data.questions.map((question, index) => {
        const mod = listQuestionModules().find((item) => item.type === question.type);
        return (
          <fieldset key={question.id} className="space-y-2 rounded-lg border p-3">
            <legend className="text-sm font-medium">
              Câu {index + 1} · {mod?.label.vi ?? question.type}
            </legend>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={question.prompt}
              onChange={(event) => updateQuestion(index, event.target.value)}
            />
          </fieldset>
        );
      })}
    </div>
  );
}
