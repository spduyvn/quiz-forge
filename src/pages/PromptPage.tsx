import { useMemo, useState } from 'react';
import { listActivityModules } from '../core/registry';
import { buildAiPrompt } from '../core/prompt';

export default function PromptPage() {
  const modules = listActivityModules();
  const [kind, setKind] = useState(modules[0]?.kind ?? '');
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const module = modules.find((item) => item.kind === kind);
  const prompt = useMemo(() => module ? buildAiPrompt({ module, topic, count, difficulty, lang: 'vi' }) : '', [module, topic, count, difficulty]);
  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-bold">Tạo prompt AI</h1>
      <p className="text-slate-500">QuizForge không gọi API; bạn chỉ cần copy prompt sang công cụ AI.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1"><span>Loại hoạt động</span><select className="w-full rounded-lg border p-2" value={kind} onChange={(e) => setKind(e.target.value)}>{modules.map((item) => <option key={item.kind} value={item.kind}>{item.meta.name.vi}</option>)}</select></label>
        <label className="space-y-1"><span>Chủ đề</span><input className="w-full rounded-lg border p-2" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ví dụ: lịch sử Việt Nam" /></label>
        <label className="space-y-1"><span>Số lượng</span><input type="number" min={1} max={100} className="w-full rounded-lg border p-2" value={count} onChange={(e) => setCount(Number(e.target.value))} /></label>
        <label className="space-y-1"><span>Độ khó</span><select className="w-full rounded-lg border p-2" value={difficulty} onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}><option value="easy">Dễ</option><option value="medium">Trung bình</option><option value="hard">Khó</option></select></label>
      </div>
      <textarea readOnly value={prompt} rows={20} className="w-full rounded-xl border p-3 font-mono text-sm" />
      <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-white" onClick={() => void navigator.clipboard?.writeText(prompt)}>Copy prompt</button>
    </section>
  );
}
