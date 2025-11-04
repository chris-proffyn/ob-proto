import { supabase } from './client'
import { logger } from '@utils/logger'
import { errorHandler } from '@services/api/error.handler'
import toast from 'react-hot-toast'

export class AuthService {
  async signUp(email: string, password: string, metadata?: any) {
    logger.info('Attempting user signup', { email })

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      })

      if (error) {
        logger.error('Signup failed', error)
        throw error
      }

      logger.info('Signup successful', { userId: data.user?.id })
      toast.success('Account created successfully!')
      return data
    } catch (error) {
      return errorHandler.handle(error, 'AuthService.signUp')
    }
  }

  async signIn(email: string, password: string) {
    logger.info('Attempting user signin', { email })

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        logger.error('Signin failed', error)
        throw error
      }

      logger.info('Signin successful', { userId: data.user?.id })
      toast.success('Welcome back!')
      return data
    } catch (error) {
      return errorHandler.handle(error, 'AuthService.signIn')
    }
  }

  async signOut() {
    logger.info('Attempting user signout')

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        logger.error('Signout failed', error)
        throw error
      }

      logger.info('Signout successful')
      toast.success('Signed out successfully')
      return true
    } catch (error) {
      errorHandler.handle(error, 'AuthService.signOut')
      return false
    }
  }

  async resetPassword(email: string) {
    logger.info('Attempting password reset', { email })

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        logger.error('Password reset failed', error)
        throw error
      }

      logger.info('Password reset email sent', { email })
      toast.success('Password reset email sent!')
      return true
    } catch (error) {
      errorHandler.handle(error, 'AuthService.resetPassword')
      return false
    }
  }

  async updatePassword(newPassword: string) {
    logger.info('Attempting password update')

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })

      if (error) {
        logger.error('Password update failed', error)
        throw error
      }

      logger.info('Password updated successfully')
      toast.success('Password updated successfully!')
      return true
    } catch (error) {
      errorHandler.handle(error, 'AuthService.updatePassword')
      return false
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        // If there's no active session, return null without logging as an error
        const message = (error as any)?.message || ''
        const name = (error as any)?.name || ''
        if (name === 'AuthSessionMissingError' || message.includes('Auth session missing')) {
          logger.debug('No active session when getting current user')
          return null
        }

        logger.error('Failed to get current user', error)
        throw error
      }

      logger.debug('Current user retrieved', { userId: user?.id })
      return user
    } catch (error) {
      // Swallow expected "no session" cases quietly
      const err = error as any
      const message = err?.message || ''
      const name = err?.name || ''
      if (name === 'AuthSessionMissingError' || message.includes('Auth session missing')) {
        return null
      }
      errorHandler.handle(error, 'AuthService.getCurrentUser')
      return null
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    logger.info('Setting up auth state listener')

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      logger.info('Auth state changed', { event, userId: session?.user?.id })
      callback(event, session)
    })

    return subscription
  }
}

export const authService = new AuthService()
