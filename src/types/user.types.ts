import type { User } from './database.types'

export interface UserProfile extends User {
  interests?: string[]
  favourite_champions?: string[]
  accounts?: UserAccount[]
}

export interface UserAccount {
  id: string
  bank_name: string
  balance: number
  credit_score?: number
}

export interface ProfileUpdateData {
  name?: string
  dob?: string
  address?: string
  avatar_url?: string
  interests?: string[]
  favourite_champions?: string[]
}

