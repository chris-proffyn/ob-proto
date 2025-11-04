export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  page_size: number
  total_pages: number
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export type Champion = {
  id: string
  name: string
  category: string
  avatar_url?: string
}

export const AVAILABLE_CHAMPIONS: Champion[] = [
  { id: '1', name: 'Financial Freedom', category: 'Finance' },
  { id: '2', name: 'Career Growth', category: 'Career' },
  { id: '3', name: 'Health & Wellness', category: 'Health' },
  { id: '4', name: 'Education', category: 'Education' },
  { id: '5', name: 'Entrepreneurship', category: 'Business' },
  { id: '6', name: 'Investing', category: 'Finance' },
  { id: '7', name: 'Real Estate', category: 'Finance' },
  { id: '8', name: 'Travel', category: 'Lifestyle' },
]

export const INTEREST_CATEGORIES = [
  'Finance',
  'Career',
  'Health',
  'Education',
  'Business',
  'Investing',
  'Real Estate',
  'Travel',
  'Technology',
  'Lifestyle',
] as const

export type InterestCategory = typeof INTEREST_CATEGORIES[number]

