import { create } from 'zustand'
import { logger } from '@utils/logger'
import type { UserProfile, ProfileUpdateData } from '../types/user.types'
import type { Account } from '../types/database.types'

interface UserState {
  profile: UserProfile | null
  accounts: Account[]
  isLoading: boolean
  error: string | null

  setProfile: (profile: UserProfile | null) => void
  updateProfile: (updates: ProfileUpdateData) => void
  setAccounts: (accounts: Account[]) => void
  addAccount: (account: Account) => void
  updateAccount: (accountId: string, updates: Partial<Account>) => void
  removeAccount: (accountId: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  accounts: [],
  isLoading: false,
  error: null,

  setProfile: (profile) => {
    logger.debug('Setting user profile in store', { userId: profile?.id })
    set({ profile })
  },

  updateProfile: (updates) => {
    logger.debug('Updating user profile in store', { updates })
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...updates } : null,
    }))
  },

  setAccounts: (accounts) => {
    logger.debug('Setting accounts in store', { count: accounts.length })
    set({ accounts })
  },

  addAccount: (account) => {
    logger.debug('Adding account to store', { accountId: account.id })
    set((state) => ({
      accounts: [...state.accounts, account],
    }))
  },

  updateAccount: (accountId, updates) => {
    logger.debug('Updating account in store', { accountId, updates })
    set((state) => ({
      accounts: state.accounts.map((acc) =>
        acc.id === accountId ? { ...acc, ...updates } : acc
      ),
    }))
  },

  removeAccount: (accountId) => {
    logger.debug('Removing account from store', { accountId })
    set((state) => ({
      accounts: state.accounts.filter((acc) => acc.id !== accountId),
    }))
  },

  setLoading: (isLoading) => {
    set({ isLoading })
  },

  setError: (error) => {
    logger.warn('User store error set', { error })
    set({ error })
  },

  reset: () => {
    logger.info('Resetting user store')
    set({
      profile: null,
      accounts: [],
      isLoading: false,
      error: null,
    })
  },
}))

