import { create } from 'zustand'
import { logger } from '@utils/logger'

interface AppState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  notifications: Notification[]

  setTheme: (theme: 'light' | 'dark') => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  setMobileMenuOpen: (open: boolean) => void
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
  reset: () => void
}

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  timestamp: Date
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  sidebarOpen: false,
  mobileMenuOpen: false,
  notifications: [],

  setTheme: (theme) => {
    logger.debug('Setting theme', { theme })
    set({ theme })
  },

  toggleSidebar: () => {
    set((state) => {
      logger.debug('Toggling sidebar', { newState: !state.sidebarOpen })
      return { sidebarOpen: !state.sidebarOpen }
    })
  },

  setSidebarOpen: (open) => {
    logger.debug('Setting sidebar open', { open })
    set({ sidebarOpen: open })
  },

  toggleMobileMenu: () => {
    set((state) => {
      logger.debug('Toggling mobile menu', { newState: !state.mobileMenuOpen })
      return { mobileMenuOpen: !state.mobileMenuOpen }
    })
  },

  setMobileMenuOpen: (open) => {
    logger.debug('Setting mobile menu open', { open })
    set({ mobileMenuOpen: open })
  },

  addNotification: (notification) => {
    logger.debug('Adding notification', { id: notification.id })
    set((state) => ({
      notifications: [...state.notifications, notification],
    }))
  },

  removeNotification: (id) => {
    logger.debug('Removing notification', { id })
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },

  clearNotifications: () => {
    logger.debug('Clearing all notifications')
    set({ notifications: [] })
  },

  reset: () => {
    logger.info('Resetting app store')
    set({
      theme: 'light',
      sidebarOpen: false,
      mobileMenuOpen: false,
      notifications: [],
    })
  },
}))

