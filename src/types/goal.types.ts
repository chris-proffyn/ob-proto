import type { Goal } from './database.types'

export type { Goal }
export type GoalFrequency = 'daily' | 'weekly' | 'monthly' | 'one-time'

export interface GoalFormData {
  name: string
  description?: string
  target_amount: number
  frequency: GoalFrequency
  due_date?: string
  regular_amount?: number
  linked_account_id?: string
}

export interface GoalWithProgress extends Goal {
  progress_percentage: number
  days_remaining?: number
  is_complete: boolean
}

export interface GoalUpdateData {
  name?: string
  description?: string
  target_amount?: number
  saved_amount?: number
  frequency?: GoalFrequency
  due_date?: string
  regular_amount?: number
  linked_account_id?: string
}

