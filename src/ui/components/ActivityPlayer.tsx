import { ErrorBoundary } from '../../core/ErrorBoundary';
import type { LoadedActivity, ResultSummary } from '../../core/types';

interface Props {
  activity: LoadedActivity;
  onFinish: (result: ResultSummary) => void;
}

export default function ActivityPlayer({ activity, onFinish }: Props) {
  const { module, parsedData, entry } = activity;
  const Player = module.Player;

  return (
    <ErrorBoundary>
      <Player
        data={parsedData}
        config={entry.config}
        activityId={entry.id}
        lang="vi"
        onFinish={(result) => {
          const summary = module.summarize(result);
          onFinish({ ...summary, activityId: entry.id, kind: module.kind });
        }}
      />
    </ErrorBoundary>
  );
}
