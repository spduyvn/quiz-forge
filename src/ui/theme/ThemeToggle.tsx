import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('quizforge:theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('quizforge:theme', dark ? 'dark' : 'light'); }, [dark]);
  return <button type="button" aria-label="Đổi giao diện sáng tối" onClick={() => setDark((value) => !value)} className="rounded-lg border px-3 py-1 text-sm">{dark ? 'Sáng' : 'Tối'}</button>;
}
