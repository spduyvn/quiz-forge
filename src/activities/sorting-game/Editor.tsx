import type { EditorProps } from '../../core/types';
import type { SortingGameData } from './schema';
export default function SortingGameEditor({ data, onChange }: EditorProps<SortingGameData>) { return <textarea className="h-64 w-full rounded border p-3 font-mono text-sm" value={JSON.stringify(data, null, 2)} onChange={(e) => { try { onChange(JSON.parse(e.target.value) as SortingGameData); } catch { /* giữ giá trị cũ khi JSON đang gõ dở */ } }} />; }
