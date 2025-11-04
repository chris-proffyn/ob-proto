import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'
import { authService } from '@services/supabase/auth.service'
import { logger } from '@utils/logger'

export function useAuth() {
  const { user, session, isAuthenticated, isLoading, setUser, setSession, setLoading, reset } =
    useAuthStore()

  useEffect(() => {
    logger.debug('useAuth hook initialized')

    // Get initial session
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Listen for auth changes
    const subscription = authService.onAuthStateChange((event, session) => {
      logger.info('Auth state change detected in hook', { event })

      setSession(session)
      setUser(session?.user ?? null)

      if (event === 'SIGNED_OUT') {
        reset()
      }
    })

    return () => {
      logger.debug('useAuth hook cleanup')
      subscription.unsubscribe()
    }
  }, [setUser, setSession, setLoading, reset])

  return {
    user,
    session,
    isAuthenticated,
    isLoading,
    signIn: authService.signIn.bind(authService),
    signUp: authService.signUp.bind(authService),
    signOut: authService.signOut.bind(authService),
    resetPassword: authService.resetPassword.bind(authService),
    updatePassword: authService.updatePassword.bind(authService),
  }
}

