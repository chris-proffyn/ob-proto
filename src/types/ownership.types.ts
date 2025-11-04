import type { Reward, UserReward } from './database.types'

export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface MembershipLevel {
  tier: MembershipTier
  name: string
  min_points: number
  max_points?: number
  color: string
}

export interface EngagementMetrics {
  referrals: number
  articles_read: number
  days_active: number
  total_points: number
}

export interface RewardWithStatus extends Reward {
  is_redeemed: boolean
  can_redeem: boolean
  user_reward_id?: string
}

export interface OwnershipState {
  membership_tier: MembershipTier
  current_points: number
  progress_to_next_tier: number
  engagement_metrics: EngagementMetrics
  available_rewards: RewardWithStatus[]
  redeemed_rewards: UserReward[]
}

