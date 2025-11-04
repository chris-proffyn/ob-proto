import type { Article } from './database.types'

export type { Article }
export type NewsTab = 'favourites' | 'popular'

export interface ArticleCard extends Article {
  is_favourite?: boolean
}

export interface NewsFilters {
  category?: string
  champion?: string
  search?: string
}

