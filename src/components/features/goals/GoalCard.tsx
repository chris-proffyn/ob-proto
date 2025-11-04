import { useNavigate } from 'react-router-dom'
import { Target, Calendar } from 'lucide-react'
import { Card } from '@components/common/Card'
import { ProgressBar } from '@components/common/ProgressBar'
import { formatCurrency, calculateDaysRemaining } from '@utils/formatters'
import type { GoalWithProgress } from '../../../types/goal.types'
import { logger } from '@utils/logger'

interface GoalCardProps {
  goal: GoalWithProgress
  compact?: boolean
}

export function GoalCard({ goal, compact = false }: GoalCardProps) {
  const navigate = useNavigate()
  const daysRemaining = calculateDaysRemaining(goal.due_date)

  const handleClick = () => {
    logger.userAction('Goal card clicked', { goalId: goal.id })
    navigate(`/goals/${goal.id}`)
  }

  return (
    <Card onClick={handleClick} hover className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <Target className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <h3 className="font-semibold text-gray-900 truncate">{goal.name}</h3>
        </div>
        {goal.is_complete && (
          <span className="text-xs font-medium text-success-600 bg-success-50 px-2 py-1 rounded">
            Complete
          </span>
        )}
      </div>

      {!compact && goal.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{goal.description}</p>
      )}

      <div className="mb-3">
        <ProgressBar
          progress={goal.progress_percentage}
          showPercentage={!compact}
          size="sm"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {formatCurrency(goal.saved_amount)} / {formatCurrency(goal.target_amount)}
          </span>
          {goal.due_date && daysRemaining !== null && (
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{daysRemaining} days left</span>
            </div>
          )}
        </div>
        {goal.frequency && (
          <span className="text-xs text-gray-500 capitalize">{goal.frequency}</span>
        )}
      </div>
    </Card>
  )
}

