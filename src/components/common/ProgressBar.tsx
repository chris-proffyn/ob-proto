import { logger } from '@utils/logger'
import { useEffect } from 'react'

interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning'
  className?: string
}

export function ProgressBar({
  progress,
  label,
  showPercentage = true,
  size = 'md',
  color = 'primary',
  className = '',
}: ProgressBarProps) {
  useEffect(() => {
    logger.debug('ProgressBar rendered', { progress, label })
  }, [progress, label])

  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const colorClasses = {
    primary: 'bg-primary-600',
    success: 'bg-success-500',
    warning: 'bg-yellow-500',
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-600">{clampedProgress.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} transition-all duration-300 ease-out`}
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}

