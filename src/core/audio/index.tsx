import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

type AudioEffect = 'correct' | 'incorrect' | 'complete';

interface AudioState {
  enabled: boolean;
  toggle: () => void;
  playEffect: (effect: AudioEffect) => void;
}

const AudioStateContext = createContext<AudioState | null>(null);
const STORAGE_KEY = 'quizforge-audio-enabled';

function getAudioContext(): AudioContext {
  const Constructor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
  if (!Constructor) throw new Error('Web Audio API không được hỗ trợ.');
  return new Constructor();
}

function tone(context: AudioContext, frequency: number, start: number, duration: number, volume: number) {
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

function playEffectTone(context: AudioContext, effect: AudioEffect) {
  const now = context.currentTime;
  if (effect === 'correct') tone(context, 660, now, 0.14, 0.08);
  if (effect === 'incorrect') tone(context, 180, now, 0.2, 0.06);
  if (effect === 'complete') {
    tone(context, 523.25, now, 0.16, 0.08);
    tone(context, 659.25, now + 0.14, 0.16, 0.08);
    tone(context, 783.99, now + 0.28, 0.24, 0.08);
  }
}

const silentAudio: AudioState = { enabled: false, toggle: () => {}, playEffect: () => {} };

export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
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
        tone(context, frequency, context.currentTime, 0.55, 0.018);
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
  const playEffect = useCallback((effect: AudioEffect) => {
    if (!enabledRef.current) return;
    try {
      const context = getContext();
      void context.resume();
      playEffectTone(context, effect);
    } catch {
      setEnabled(false);
    }
  }, [getContext]);

  const value = useMemo(() => ({ enabled, toggle, playEffect }), [enabled, toggle, playEffect]);
  return <AudioStateContext.Provider value={value}>{children}</AudioStateContext.Provider>;
}

export function useAudio() {
  return useContext(AudioStateContext) ?? silentAudio;
}
