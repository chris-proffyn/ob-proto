import type { User as SupabaseUser, Session } from '@supabase/supabase-js'

export type { SupabaseUser, Session }

export interface AuthState {
  user: SupabaseUser | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface SignUpData {
  email: string
  password: string
  metadata?: {
    name?: string
    full_name?: string
  }
}

export interface SignInData {
  email: string
  password: string
}

