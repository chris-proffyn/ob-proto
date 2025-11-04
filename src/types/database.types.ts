export interface User {
  id: string
  name: string
  email: string
  dob?: string
  address?: string
  avatar_url?: string
  created_at?: string
  updated_at?: string
}

export interface Account {
  id: string
  user_id: string
  bank_name: string
  balance: number
  credit_score?: number
  account_number?: string
  sort_code?: string
  iban?: string
  account_type?: string
  created_at?: string
  updated_at?: string
}

export interface Goal {
  id: string
  user_id: string
  name: string
  description?: string
  target_amount: number
  saved_amount: number
  frequency?: 'daily' | 'weekly' | 'monthly' | 'one-time'
  due_date?: string
  regular_amount?: number
  linked_account_id?: string
  created_at?: string
  updated_at?: string
}

export interface Article {
  id: string
  title: string
  summary: string
  url: string
  champion?: string
  category: string
  thumbnail_url?: string
  created_at?: string
}

export interface Reward {
  id: string
  name: string
  description: string
  points_required: number
  image_url?: string
  created_at?: string
}

export interface UserReward {
  id: string
  user_id: string
  reward_id: string
  redeemed: boolean
  redeemed_at?: string
  created_at?: string
}

export interface UserInterest {
  id: string
  user_id: string
  interest: string
  created_at?: string
}

export interface UserChampion {
  id: string
  user_id: string
  champion_name: string
  created_at?: string
}

