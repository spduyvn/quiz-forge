import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Volume1, Volume2, VolumeX, type LucideIcon } from 'lucide-react';

type AudioEffect = 'correct' | 'incorrect' | 'complete';

export interface AudioState {
  enabled: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (volume: number) => void;
  playEffect: (effect: AudioEffect) => void;
}

const AudioStateContext = createContext<AudioState | null>(null);
const STORAGE_KEY = 'quizforge-audio-enabled';
const VOLUME_KEY = 'quizforge-audio-volume';

// Hiệu ứng gốc được cân bằng sẵn; nhạc nền cố tình nhỏ hơn nhiều để không lấn át.
const EFFECT_VOLUME = 0.08;
const MUSIC_VOLUME = 0.018;

function clampVolume(value: number): number {
  if (!Number.isFinite(value)) return 0.6;
  return Math.min(1, Math.max(0, value));
}

function getAudioContext(): AudioContext {
  const Constructor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
  if (!Constructor) throw new Error('Web Audio API không được hỗ trợ.');
  return new Constructor();
}

function tone(context: AudioContext, frequency: number, start: number, duration: number, volume: number) {
  if (volume <= 0) return;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playEffectTone(context: AudioContext, effect: AudioEffect, masterVolume: number) {
  const now = context.currentTime;
  const volume = EFFECT_VOLUME * masterVolume;
  if (effect === 'correct') tone(context, 660, now, 0.14, volume);
  if (effect === 'incorrect') tone(context, 180, now, 0.2, volume * 0.75);
  if (effect === 'complete') {
    tone(context, 523.25, now, 0.16, volume);
    tone(context, 659.25, now + 0.14, 0.16, volume);
    tone(context, 783.99, now + 0.28, 0.24, volume);
  }
}

const silentAudio: AudioState = {
  enabled: false,
  volume: 0.6,
  toggle: () => {},
  setVolume: () => {},
  playEffect: () => {},
};

function readStoredVolume(): number {
  try {
    const stored = window.localStorage.getItem(VOLUME_KEY);
    return stored === null ? 0.6 : clampVolume(Number(stored));
  } catch {
    return 0.6;
  }
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [volume, setVolumeState] = useState(readStoredVolume);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const volumeRef = useRef(volume);
  volumeRef.current = volume;
  const contextRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);
  const noteRef = useRef(0);

  const getContext = useCallback(() => {
    if (!contextRef.current) contextRef.current = getAudioContext();
    return contextRef.current;
  }, []);

  const stopMusic = useCallback(() => {
    if (musicTimerRef.current !== null) {
      window.clearInterval(musicTimerRef.current);
      musicTimerRef.current = null;
    }
  }, []);

  const startMusic = useCallback(() => {
    stopMusic();
    try {
      const context = getContext();
      void context.resume();
      const notes = [261.63, 329.63, 392, 329.63];
      const playNote = () => {
        if (!enabledRef.current) return;
        const frequency = notes[noteRef.current % notes.length];
        noteRef.current += 1;
        tone(context, frequency, context.currentTime, 0.55, MUSIC_VOLUME * volumeRef.current);
      };
      playNote();
      musicTimerRef.current = window.setInterval(playNote, 900);
    } catch {
      setEnabled(false);
    }
  }, [getContext, stopMusic]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // Audio preference is optional when storage is unavailable.
    }
    if (enabled) startMusic();
    else stopMusic();
  }, [enabled, startMusic, stopMusic]);

  useEffect(() => {
    try {
      window.localStorage.setItem(VOLUME_KEY, String(volume));
    } catch {
      // Audio preference is optional when storage is unavailable.
    }
  }, [volume]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopMusic();
      else if (enabledRef.current) startMusic();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [startMusic, stopMusic]);

  useEffect(() => () => {
    stopMusic();
    void contextRef.current?.close();
  }, [stopMusic]);

  const toggle = useCallback(() => setEnabled((value) => !value), []);
  const setVolume = useCallback((next: number) => setVolumeState(clampVolume(next)), []);

  const playEffect = useCallback((effect: AudioEffect) => {
    if (!enabledRef.current) return;
    try {
      const context = getContext();
      void context.resume();
      playEffectTone(context, effect, volumeRef.current);
    } catch {
      setEnabled(false);
    }
  }, [getContext]);

  const value = useMemo(() => ({ enabled, volume, toggle, setVolume, playEffect }), [enabled, volume, toggle, setVolume, playEffect]);
  return <AudioStateContext.Provider value={value}>{children}</AudioStateContext.Provider>;
}

export function useAudio() {
  return useContext(AudioStateContext) ?? silentAudio;
}

export function volumeIcon(volume: number, enabled: boolean): LucideIcon {
  if (!enabled || volume === 0) return VolumeX;
  return volume < 0.5 ? Volume1 : Volume2;
}
