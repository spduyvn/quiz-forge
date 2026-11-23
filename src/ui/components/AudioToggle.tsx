import { useAudio } from '../../core/audio';

export default function AudioToggle() {
  const { enabled, toggle } = useAudio();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
      className="rounded-lg border px-3 py-1.5 text-sm hover:border-indigo-500"
    >
      {enabled ? '🔊 Âm thanh' : '🔇 Âm thanh'}
    </button>
  );
}
