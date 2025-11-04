import { Component, ErrorInfo, ReactNode } from 'react'
import { logger } from '@utils/logger'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Error caught by boundary', error, {
      componentStack: errorInfo.componentStack,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-center text-gray-900">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-center text-gray-600">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 overflow-auto">
                <pre>{this.state.error.message}</pre>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

