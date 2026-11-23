import { useState } from 'react';
import type { PlayerProps } from '../../core/types';
import type { SortingGameData, SortingGameResult } from './schema';

export default function SortingGamePlayer({ data, onFinish }: PlayerProps<SortingGameData, SortingGameResult>) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [startedAt] = useState(() => Date.now());
  const [submitted, setSubmitted] = useState(false);
  const remaining = data.items.filter((item) => !placed[item.id]);
  const drop = (itemId: string, groupId: string) => setPlaced((previous) => ({ ...previous, [itemId]: groupId }));
  const finish = () => {
    const correct = data.items.filter((item) => placed[item.id] === item.groupId).length;
    setSubmitted(true);
    onFinish({ correct, total: data.items.length, durationMs: Date.now() - startedAt });
  };
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{data.title}</h2>
      <div className="flex flex-wrap gap-2 rounded-lg border p-3" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const id = event.dataTransfer.getData('text/plain'); if (id) setPlaced((previous) => { const next = { ...previous }; delete next[id]; return next; }); }}>
        {remaining.map((item) => <span key={item.id} draggable onDragStart={(event) => event.dataTransfer.setData('text/plain', item.id)} className="cursor-grab rounded-lg bg-slate-100 px-3 py-2 dark:bg-slate-800">{item.text}</span>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.groups.map((group) => <div key={group.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { const id = event.dataTransfer.getData('text/plain'); if (id) drop(id, group.id); }} className="min-h-32 rounded-lg border-2 border-dashed p-3">
          <h3 className="mb-2 font-medium">{group.name}</h3>
          <div className="flex flex-wrap gap-2">{data.items.filter((item) => placed[item.id] === group.id).map((item) => <button key={item.id} type="button" onClick={() => !submitted && setPlaced((previous) => { const next = { ...previous }; delete next[item.id]; return next; })} className={submitted ? (item.groupId === group.id ? 'bg-green-100' : 'bg-red-100') : 'bg-slate-100'}>{item.text}</button>)}</div>
        </div>)}
      </div>
      <button type="button" disabled={Object.keys(placed).length !== data.items.length || submitted} onClick={finish} className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-40">Kiểm tra</button>
    </section>
  );
}
