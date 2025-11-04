import { AlertCircle } from 'lucide-react'
import { logger } from '@utils/logger'
import { useEffect } from 'react'

interface ErrorMessageProps {
  message: string
  title?: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({
  message,
  title = 'Error',
  onRetry,
  className = '',
}: ErrorMessageProps) {
  useEffect(() => {
    logger.debug('ErrorMessage rendered', { message, title })
  }, [message, title])

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900">{title}</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

