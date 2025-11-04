import { useEffect, useCallback } from 'react'
import { useOwnershipStore } from '@store/ownershipStore'
import { databaseService } from '@services/supabase/database.service'
import { logger } from '@utils/logger'
import type { Reward, UserReward } from '../types/database.types'

export function useOwnership(userId?: string) {
  const {
    membershipTier,
    currentPoints,
    progressToNextTier,
    engagementMetrics,
    availableRewards,
    redeemedRewards,
    isLoading,
    error,
    setEngagementMetrics,
    updateRewardStatus,
    redeemReward,
    setLoading,
    setError,
  } = useOwnershipStore()

  const loadEngagementData = useCallback(async () => {
    if (!userId) return

    logger.info('Loading engagement data', { userId })
    setLoading(true)
    setError(null)

    try {
      const [engagementData, rewards, userRewards] = await Promise.all([
        databaseService.query('user_engagement', {
          filters: { user_id: userId },
        }),
        databaseService.query<Reward>('rewards', {
          order: { column: 'points_required', ascending: true },
        }),
        databaseService.query<UserReward>('user_rewards', {
          filters: { user_id: userId },
        }),
      ])

      if (engagementData && engagementData.length > 0) {
        const metrics = engagementData[0] as any
        setEngagementMetrics({
          referrals: metrics.referrals_count || 0,
          articles_read: metrics.articles_read_count || 0,
          days_active: metrics.days_active_count || 0,
          total_points: metrics.total_points || 0,
        })
      }

      if (rewards && userRewards) {
        updateRewardStatus(rewards, userRewards)
      }
    } catch (err) {
      logger.error('Error loading engagement data', err as Error)
      setError('Failed to load engagement data')
    } finally {
      setLoading(false)
    }
  }, [userId, setEngagementMetrics, updateRewardStatus, setLoading, setError])

  useEffect(() => {
    if (userId) {
      loadEngagementData()
    }
  }, [userId, loadEngagementData])

  const redeemRewardById = useCallback(
    async (rewardId: string) => {
      if (!userId) return false

      logger.info('Redeeming reward', { userId, rewardId })
      setLoading(true)
      setError(null)

      try {
        const reward = availableRewards.find((r) => r.id === rewardId)
        if (!reward || reward.points_required > currentPoints) {
          setError('Insufficient points or reward not found')
          return false
        }

        const userReward = await databaseService.insert<UserReward>('user_rewards', {
          user_id: userId,
          reward_id: rewardId,
          redeemed: true,
          redeemed_at: new Date().toISOString(),
        })

        if (userReward) {
          redeemReward(rewardId)
          await loadEngagementData()
          return true
        }
        setError('Failed to redeem reward')
        return false
      } catch (err) {
        logger.error('Error redeeming reward', err as Error)
        setError('Failed to redeem reward')
        return false
      } finally {
        setLoading(false)
      }
    },
    [userId, availableRewards, currentPoints, redeemReward, loadEngagementData, setLoading, setError]
  )

  return {
    membershipTier,
    currentPoints,
    progressToNextTier,
    engagementMetrics,
    availableRewards,
    redeemedRewards,
    isLoading,
    error,
    loadEngagementData,
    redeemReward: redeemRewardById,
  }
}

