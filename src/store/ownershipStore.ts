import { create } from 'zustand'
import { logger } from '@utils/logger'
import type {
  MembershipTier,
  EngagementMetrics,
  RewardWithStatus,
} from '../types/ownership.types'
import type { Reward, UserReward } from '../types/database.types'
import { MEMBERSHIP_TIERS } from '@utils/constants'

interface OwnershipStateStore {
  membershipTier: MembershipTier
  currentPoints: number
  progressToNextTier: number
  engagementMetrics: EngagementMetrics
  availableRewards: RewardWithStatus[]
  redeemedRewards: UserReward[]
  isLoading: boolean
  error: string | null

  setMembershipTier: (tier: MembershipTier) => void
  setCurrentPoints: (points: number) => void
  calculateMembershipTier: (points: number) => MembershipTier
  calculateProgressToNextTier: (points: number, tier: MembershipTier) => number
  setEngagementMetrics: (metrics: EngagementMetrics) => void
  setAvailableRewards: (rewards: Reward[]) => void
  setRedeemedRewards: (rewards: UserReward[]) => void
  updateRewardStatus: (rewards: Reward[], userRewards: UserReward[]) => void
  redeemReward: (rewardId: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const calculateTier = (points: number): MembershipTier => {
  if (points >= MEMBERSHIP_TIERS.platinum.min_points) return 'platinum'
  if (points >= MEMBERSHIP_TIERS.gold.min_points) return 'gold'
  if (points >= MEMBERSHIP_TIERS.silver.min_points) return 'silver'
  return 'bronze'
}

const calculateProgress = (points: number, tier: MembershipTier): number => {
  const tierInfo = MEMBERSHIP_TIERS[tier]
  const minPoints = tierInfo.min_points
  const maxPoints = tierInfo.max_points

  if (!maxPoints) {
    return 100
  }

  const range = maxPoints - minPoints
  const currentProgress = points - minPoints
  return Math.min(Math.max((currentProgress / range) * 100, 0), 100)
}

export const useOwnershipStore = create<OwnershipStateStore>((set, get) => ({
  membershipTier: 'bronze',
  currentPoints: 0,
  progressToNextTier: 0,
  engagementMetrics: {
    referrals: 0,
    articles_read: 0,
    days_active: 0,
    total_points: 0,
  },
  availableRewards: [],
  redeemedRewards: [],
  isLoading: false,
  error: null,

  setMembershipTier: (tier) => {
    logger.debug('Setting membership tier', { tier })
    const points = get().currentPoints
    const progress = calculateProgress(points, tier)
    set({ membershipTier: tier, progressToNextTier: progress })
  },

  setCurrentPoints: (points) => {
    logger.debug('Setting current points', { points })
    const tier = calculateTier(points)
    const progress = calculateProgress(points, tier)
    set({
      currentPoints: points,
      membershipTier: tier,
      progressToNextTier: progress,
      engagementMetrics: {
        ...get().engagementMetrics,
        total_points: points,
      },
    })
  },

  calculateMembershipTier: calculateTier,
  calculateProgressToNextTier: calculateProgress,

  setEngagementMetrics: (metrics) => {
    logger.debug('Setting engagement metrics', { metrics })
    const tier = calculateTier(metrics.total_points)
    const progress = calculateProgress(metrics.total_points, tier)
    set({
      engagementMetrics: metrics,
      currentPoints: metrics.total_points,
      membershipTier: tier,
      progressToNextTier: progress,
    })
  },

  setAvailableRewards: (rewards) => {
    logger.debug('Setting available rewards', { count: rewards.length })
    const userRewards = get().redeemedRewards
    const currentPoints = get().currentPoints

    const rewardsWithStatus: RewardWithStatus[] = rewards.map((reward) => {
      const userReward = userRewards.find((ur) => ur.reward_id === reward.id)
      return {
        ...reward,
        is_redeemed: userReward?.redeemed || false,
        can_redeem: !userReward && currentPoints >= reward.points_required,
        user_reward_id: userReward?.id,
      }
    })

    set({ availableRewards: rewardsWithStatus })
  },

  setRedeemedRewards: (rewards) => {
    logger.debug('Setting redeemed rewards', { count: rewards.length })
    set({ redeemedRewards: rewards })
  },

  updateRewardStatus: (rewards, userRewards) => {
    logger.debug('Updating reward status', { rewardsCount: rewards.length })
    const currentPoints = get().currentPoints

    const rewardsWithStatus: RewardWithStatus[] = rewards.map((reward) => {
      const userReward = userRewards.find((ur) => ur.reward_id === reward.id)
      return {
        ...reward,
        is_redeemed: userReward?.redeemed || false,
        can_redeem: !userReward && currentPoints >= reward.points_required,
        user_reward_id: userReward?.id,
      }
    })

    set({ availableRewards: rewardsWithStatus, redeemedRewards: userRewards })
  },

  redeemReward: (rewardId) => {
    logger.debug('Redeeming reward', { rewardId })
    set((state) => ({
      availableRewards: state.availableRewards.map((reward) =>
        reward.id === rewardId
          ? { ...reward, is_redeemed: true, can_redeem: false }
          : reward
      ),
    }))
  },

  setLoading: (isLoading) => {
    set({ isLoading })
  },

  setError: (error) => {
    logger.warn('Ownership store error set', { error })
    set({ error })
  },

  reset: () => {
    logger.info('Resetting ownership store')
    set({
      membershipTier: 'bronze',
      currentPoints: 0,
      progressToNextTier: 0,
      engagementMetrics: {
        referrals: 0,
        articles_read: 0,
        days_active: 0,
        total_points: 0,
      },
      availableRewards: [],
      redeemedRewards: [],
      isLoading: false,
      error: null,
    })
  },
}))

