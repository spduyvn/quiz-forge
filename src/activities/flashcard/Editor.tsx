import type { EditorProps } from '../../core/types';
import type { FlashcardData } from './schema';

export default function FlashcardEditor({ data, onChange }: EditorProps<FlashcardData>) {
  return <div className="space-y-4"><input className="w-full rounded border p-2" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} />{data.cards.map((card, index) => <fieldset className="grid gap-2 rounded border p-3 sm:grid-cols-2" key={card.id}><input className="rounded border p-2" value={card.front} aria-label={`Mặt trước ${index + 1}`} onChange={(e) => onChange({ ...data, cards: data.cards.map((item, i) => i === index ? { ...item, front: e.target.value } : item) })} /><input className="rounded border p-2" value={card.back} aria-label={`Mặt sau ${index + 1}`} onChange={(e) => onChange({ ...data, cards: data.cards.map((item, i) => i === index ? { ...item, back: e.target.value } : item) })} /></fieldset>)}</div>;
}
