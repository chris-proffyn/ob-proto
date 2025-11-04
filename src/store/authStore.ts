import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logger } from '@utils/logger'
import type { User as SupabaseUser, Session } from '@supabase/supabase-js'

interface AuthState {
  user: SupabaseUser | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  setUser: (user: SupabaseUser | null) => void
  setSession: (session: Session | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      setUser: (user) => {
        logger.debug('Setting user in store', { userId: user?.id })
        set({ user, isAuthenticated: !!user })
      },

      setSession: (session) => {
        logger.debug('Setting session in store', {
          sessionId: session?.access_token?.substring(0, 10),
        })
        set({ session })
      },

      setLoading: (isLoading) => {
        set({ isLoading })
      },

      setError: (error) => {
        logger.warn('Auth error set', { error })
        set({ error })
      },

      reset: () => {
        logger.info('Resetting auth store')
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

