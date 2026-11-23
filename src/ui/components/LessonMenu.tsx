import { Link } from 'react-router-dom';
import type { LoadedActivity } from '../../core/types';

interface Props {
  activities: LoadedActivity[];
}

export default function LessonMenu({ activities }: Props) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {activities.map((activity) => (
        <li key={activity.entry.id}>
          <Link
            to={`/play/${encodeURIComponent(activity.entry.id)}`}
            className="flex h-full flex-col gap-2 rounded-xl border bg-white p-4 hover:border-indigo-400 dark:bg-slate-900"
          >
            <span className="text-2xl" aria-hidden>
              {activity.module.meta.icon as string}
            </span>
            <span className="font-semibold">
              {activity.module.meta.name.vi} · {activity.entry.id}
            </span>
            <span className="text-sm text-slate-500">{activity.module.meta.description.vi}</span>
            <span className="mt-auto text-xs uppercase tracking-wide text-indigo-600">
              {activity.module.meta.tags.join(' · ')}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
