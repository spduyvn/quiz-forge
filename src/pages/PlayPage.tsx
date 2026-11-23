import { Navigate, Link, useParams } from 'react-router-dom';
import { useContentStore } from '../core/store';
import ActivityPlayer from '../ui/components/ActivityPlayer';

export default function PlayPage() {
  const { activityId } = useParams();
  const content = useContentStore((state) => state.content);
  const addResult = useContentStore((state) => state.addResult);
  if (!content) return <Navigate to="/" replace />;
  const activity = content.activities.find((item) => item.entry.id === activityId);
  if (!activity) return <Navigate to="/lesson" replace />;
  return (
    <section className="space-y-5">
      <Link to="/lesson" className="text-sm text-indigo-600">← Danh sách hoạt động</Link>
      <ActivityPlayer
        activity={activity}
        onFinish={(result) => {
          addResult(result);
        }}
      />
    </section>
  );
}
