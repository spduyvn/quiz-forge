import { Link } from 'react-router-dom';
import { quizModule } from '../activities/quiz';
import { useContentStore } from '../core/store';
import type { ActivityEntry, LoadedActivity } from '../core/types';
import ActivityPlayer from '../ui/components/ActivityPlayer';

const sample = quizModule.samples.find((item) => item.name === 'English basics') ?? quizModule.samples[0];
const sampleEntry: ActivityEntry = {
  id: 'sample-english-basics',
  kind: quizModule.kind,
  config: { mode: 'practice' },
  data: sample.data,
};
const sampleActivity: LoadedActivity = {
  entry: sampleEntry,
  module: quizModule as unknown as LoadedActivity['module'],
  parsedData: sample.data,
};

export default function HomePage() {
  const addResult = useContentStore((state) => state.addResult);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Bài mẫu</p>
        <h1 className="text-3xl font-bold">English Basics</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">
          Practice everyday English vocabulary and grammar with five interactive questions.
        </p>
      </header>

      <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-slate-900 sm:p-6">
        <ActivityPlayer activity={sampleActivity} onFinish={addResult} />
      </div>

      <nav className="flex flex-wrap gap-3" aria-label="Tùy chọn nội dung">
        <Link to="/open" className="rounded-lg border px-4 py-2 font-medium hover:border-indigo-500">
          Mở nội dung của tôi
        </Link>
        <Link to="/prompt" className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
          Tạo prompt AI
        </Link>
      </nav>
    </section>
  );
}
