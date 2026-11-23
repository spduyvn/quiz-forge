import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Activity crashed', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback?.(this.state.error) ?? (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
            <p className="font-semibold">Hoạt động này gặp lỗi và đã được dừng lại.</p>
            <p className="mt-1 text-sm">{this.state.error.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
