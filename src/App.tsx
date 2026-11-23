import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import LoadPage from './pages/LoadPage';
import LessonPage from './pages/LessonPage';
import PlayPage from './pages/PlayPage';
import PromptPage from './pages/PromptPage';
import './index.css';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="border-b bg-white/80 backdrop-blur dark:bg-slate-900/80">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link to="/" className="text-xl font-bold text-indigo-600">QuizForge</Link>
            <Link to="/prompt" className="text-sm text-indigo-600">Tạo prompt AI</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8"><Routes><Route path="/" element={<LoadPage />} /><Route path="/lesson" element={<LessonPage />} /><Route path="/play/:activityId" element={<PlayPage />} /><Route path="/prompt" element={<PromptPage />} /></Routes></main>
      </div>
    </HashRouter>
  );
}
