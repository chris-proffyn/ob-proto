export const APP_NAME = 'Outbehaving'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  GOALS: '/goals',
  NEWS: '/news',
  OWNERSHIP: '/ownership',
  NOT_FOUND: '/404',
} as const

export const MEMBERSHIP_TIERS = {
  bronze: { name: 'Bronze', min_points: 0, max_points: 999, color: '#CD7F32' },
  silver: { name: 'Silver', min_points: 1000, max_points: 4999, color: '#C0C0C0' },
  gold: { name: 'Gold', min_points: 5000, max_points: 19999, color: '#FFD700' },
  platinum: { name: 'Platinum', min_points: 20000, max_points: undefined, color: '#E5E4E2' },
} as const

export const POINTS_VALUES = {
  ARTICLE_READ: 10,
  GOAL_COMPLETED: 50,
  REFERRAL: 100,
  DAY_ACTIVE: 5,
} as const

export const GOAL_FREQUENCIES = ['daily', 'weekly', 'monthly', 'one-time'] as const

export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
} as const

