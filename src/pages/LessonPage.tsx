import { Navigate, Link } from 'react-router-dom';
import LessonMenu from '../ui/components/LessonMenu';
import { useContentStore } from '../core/store';

export default function LessonPage() {
  const content = useContentStore((state) => state.content);
  if (!content) return <Navigate to="/" replace />;
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <Link to="/" className="text-sm text-indigo-600">← Mở nội dung khác</Link>
        <h1 className="text-3xl font-bold">{content.envelope.meta.title}</h1>
        {content.envelope.meta.description ? <p className="text-slate-500">{content.envelope.meta.description}</p> : null}
      </header>
      {content.issues.length > 0 ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Một số activity không thể mở và đã được bỏ qua.
        </div>
      ) : null}
      <LessonMenu activities={content.activities} />
    </section>
  );
}
