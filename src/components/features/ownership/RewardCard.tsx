import { Award, CheckCircle } from 'lucide-react'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { formatNumber } from '@utils/formatters'
import type { RewardWithStatus } from '../../../types/ownership.types'
import { logger } from '@utils/logger'

interface RewardCardProps {
  reward: RewardWithStatus
  onRedeem?: (rewardId: string) => void
  isLoading?: boolean
}

export function RewardCard({ reward, onRedeem, isLoading = false }: RewardCardProps) {
  const handleRedeem = () => {
    if (onRedeem && reward.can_redeem) {
      logger.userAction('Reward redemption clicked', { rewardId: reward.id })
      onRedeem(reward.id)
    }
  }

  return (
    <Card className={`p-4 ${reward.is_redeemed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        {reward.image_url ? (
          <img
            src={reward.image_url}
            alt={reward.name}
            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-8 h-8 text-primary-600" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">{reward.name}</h3>
            {reward.is_redeemed && (
              <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {formatNumber(reward.points_required)} points
            </span>
            {!reward.is_redeemed && (
              <Button
                variant={reward.can_redeem ? 'primary' : 'secondary'}
                size="sm"
                onClick={handleRedeem}
                disabled={!reward.can_redeem || isLoading}
                isLoading={isLoading}
              >
                {reward.can_redeem ? 'Redeem' : 'Not Enough Points'}
              </Button>
            )}
            {reward.is_redeemed && (
              <span className="text-sm text-success-600 font-medium">Redeemed</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

