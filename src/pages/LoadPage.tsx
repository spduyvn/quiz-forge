import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentLoadError, loadFromFile, loadFromText } from '../core/loader';
import { decodeShare } from '../core/share';
import { useContentStore } from '../core/store';

export default function LoadPage() {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setContent = useContentStore((state) => state.setContent);

  const accept = (loaded: ReturnType<typeof loadFromText>) => {
    setContent(loaded);
    setWarnings(loaded.issues.map((issue) => issue.message));
    navigate('/lesson');
  };

  const loadText = () => {
    try {
      accept(loadFromText(text));
    } catch (error) {
      if (error instanceof ContentLoadError) {
        setErrors(error.issues);
        return;
      }
      setErrors([error instanceof Error ? error.message : 'Không đọc được nội dung.']);
    }
  };

  const loadFile = async (file: File) => {
    try {
      accept(await loadFromFile(file));
    } catch (error) {
      setErrors(error instanceof ContentLoadError ? error.issues : ['Không đọc được file.']);
    }
  };

  const openHash = () => {
    const hash = window.location.hash.slice(1);
    const encoded = hash.startsWith('share=') ? hash.slice(6) : '';
    if (!encoded) {
      setErrors(['Không tìm thấy dữ liệu chia sẻ trong URL.']);
      return;
    }
    try {
      accept(loadFromText(JSON.stringify(decodeShare(encoded))));
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Liên kết chia sẻ không hợp lệ.']);
    }
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Mở nội dung</h1>
        <p className="text-slate-500">Dán JSON, chọn file, hoặc mở liên kết chia sẻ.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="rounded-lg bg-indigo-600 px-4 py-2 text-white" onClick={() => fileInput.current?.click()}>
          Chọn file JSON
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void loadFile(file);
          }}
        />
        <button type="button" className="rounded-lg border px-4 py-2" onClick={openHash}>
          Mở liên kết chia sẻ
        </button>
      </div>

      <label className="block space-y-2">
        <span className="font-medium">Hoặc dán JSON</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={10}
          className="w-full rounded-xl border p-3 font-mono text-sm"
          placeholder='{"schema":"quizforge.content","version":"1.0",...}'
        />
      </label>
      <button
        type="button"
        onClick={loadText}
        disabled={!text.trim()}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:opacity-40"
      >
        Kiểm tra và mở
      </button>

      {errors.length > 0 ? (
        <ul role="alert" className="space-y-1 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}
      {warnings.length > 0 ? (
        <ul className="space-y-1 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
