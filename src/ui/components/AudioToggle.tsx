import { useId } from 'react';
import { volumeIcon, useAudio } from '../../core/audio';

export default function AudioToggle() {
  const { enabled, volume, toggle, setVolume } = useAudio();
  const sliderId = useId();
  const Icon = volumeIcon(volume, enabled);

  return (
    <div className="flex items-center gap-2 rounded-lg border px-2 py-1.5">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
        title={enabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
        className="rounded p-1 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        <Icon aria-hidden className="h-5 w-5" />
      </button>
      <label htmlFor={sliderId} className="sr-only">Âm lượng</label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={100}
        step={5}
        value={Math.round(volume * 100)}
        onChange={(event) => setVolume(Number(event.target.value) / 100)}
        aria-valuetext={`${Math.round(volume * 100)}%`}
        className="h-1.5 w-20 cursor-pointer accent-indigo-600"
      />
    </div>
  );
}
