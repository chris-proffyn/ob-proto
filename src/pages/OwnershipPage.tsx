import { useAuth } from '@hooks/useAuth'
import { useOwnership } from '@hooks/useOwnership'
import { RewardCard } from '@components/features/ownership/RewardCard'
import { ProgressBar } from '@components/common/ProgressBar'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import { Card } from '@components/common/Card'
import { formatNumber } from '@utils/formatters'
import { MEMBERSHIP_TIERS } from '@utils/constants'
import { Trophy, Award, Users, BookOpen, Calendar } from 'lucide-react'

export default function OwnershipPage() {
  const { user } = useAuth()
  const {
    membershipTier,
    currentPoints,
    progressToNextTier,
    engagementMetrics,
    availableRewards,
    isLoading,
    error,
    redeemReward,
  } = useOwnership(user?.id)

  const tierInfo = MEMBERSHIP_TIERS[membershipTier]
  const nextTier = membershipTier === 'platinum' ? null : 
    membershipTier === 'bronze' ? 'silver' :
    membershipTier === 'silver' ? 'gold' : 'platinum'
  const nextTierInfo = nextTier ? MEMBERSHIP_TIERS[nextTier] : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary-600" />
          Ownership & Rewards
        </h1>
        <p className="text-gray-600 mt-1">Track your engagement and redeem rewards</p>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" text="Loading ownership data..." />
      ) : error ? (
        <ErrorMessage message={error} title="Error Loading Data" />
      ) : (
        <>
          {/* Membership Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {tierInfo.name} Member
                </h2>
                <p className="text-gray-600 mt-1">
                  {formatNumber(currentPoints)} points
                </p>
              </div>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ backgroundColor: tierInfo.color }}
              >
                {tierInfo.name[0]}
              </div>
            </div>

            {nextTierInfo && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progress to {nextTierInfo.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatNumber(nextTierInfo.min_points - currentPoints)} points needed
                  </span>
                </div>
                <ProgressBar
                  progress={progressToNextTier}
                  size="lg"
                  color="primary"
                />
              </div>
            )}
          </Card>

          {/* Engagement Metrics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Engagement Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {engagementMetrics.referrals}
                </p>
                <p className="text-sm text-gray-600">Referrals</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {engagementMetrics.articles_read}
                </p>
                <p className="text-sm text-gray-600">Articles Read</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {engagementMetrics.days_active}
                </p>
                <p className="text-sm text-gray-600">Days Active</p>
              </div>
            </div>
          </Card>

          {/* Rewards */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" />
              Available Rewards
            </h2>
            {availableRewards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    onRedeem={redeemReward}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No rewards available
                </h3>
                <p className="text-gray-600">
                  Check back later for new rewards!
                </p>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  )
}

