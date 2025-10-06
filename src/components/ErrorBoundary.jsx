import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console or error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold mb-4 text-red-500">Oops! Something went wrong</h1>
          <p className="text-xl mb-6 text-center">
            We're sorry, but something unexpected happened while playing the game.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg mb-6 max-w-2xl">
            <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
            <pre className="text-sm text-red-300 overflow-auto">
              {this.state.error && this.state.error.toString()}
            </pre>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reload Game
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
