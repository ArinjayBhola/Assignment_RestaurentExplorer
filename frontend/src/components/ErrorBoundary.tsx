import { Component } from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message?: string;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('ErrorBoundary caught', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, message: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 text-center shadow-card">
          <h2 className="text-2xl font-semibold text-gray-900">Something went wrong</h2>
          <p className="mt-2 text-sm text-gray-600">
            {this.state.message ?? 'Please try again in a moment.'}
          </p>
          <button
            type="button"
            className="mt-6 rounded-full bg-brand-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            onClick={this.handleRetry}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

