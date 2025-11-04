import { create } from 'zustand'
import { logger } from '@utils/logger'
import type { Article, ArticleCard, NewsTab } from '../types/news.types'

interface NewsState {
  articles: ArticleCard[]
  favouriteArticleIds: Set<string>
  activeTab: NewsTab
  isLoading: boolean
  error: string | null

  setArticles: (articles: Article[]) => void
  addArticle: (article: Article) => void
  toggleFavourite: (articleId: string) => void
  setActiveTab: (tab: NewsTab) => void
  getFilteredArticles: () => ArticleCard[]
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  favouriteArticleIds: new Set(),
  activeTab: 'popular',
  isLoading: false,
  error: null,

  setArticles: (articles) => {
    logger.debug('Setting articles in store', { count: articles.length })
    const articlesWithFavourites: ArticleCard[] = articles.map((article) => ({
      ...article,
      is_favourite: get().favouriteArticleIds.has(article.id),
    }))
    set({ articles: articlesWithFavourites })
  },

  addArticle: (article) => {
    logger.debug('Adding article to store', { articleId: article.id })
    const isFavourite = get().favouriteArticleIds.has(article.id)
    const articleCard: ArticleCard = { ...article, is_favourite: isFavourite }
    set((state) => ({
      articles: [...state.articles, articleCard],
    }))
  },

  toggleFavourite: (articleId) => {
    logger.debug('Toggling article favourite', { articleId })
    set((state) => {
      const newFavourites = new Set(state.favouriteArticleIds)
      if (newFavourites.has(articleId)) {
        newFavourites.delete(articleId)
      } else {
        newFavourites.add(articleId)
      }

      const updatedArticles = state.articles.map((article) =>
        article.id === articleId
          ? { ...article, is_favourite: newFavourites.has(articleId) }
          : article
      )

      return {
        favouriteArticleIds: newFavourites,
        articles: updatedArticles,
      }
    })
  },

  setActiveTab: (tab) => {
    logger.debug('Setting active news tab', { tab })
    set({ activeTab: tab })
  },

  getFilteredArticles: () => {
    const state = get()
    if (state.activeTab === 'favourites') {
      return state.articles.filter((article) => article.is_favourite)
    }
    return state.articles
  },

  setLoading: (isLoading) => {
    set({ isLoading })
  },

  setError: (error) => {
    logger.warn('News store error set', { error })
    set({ error })
  },

  reset: () => {
    logger.info('Resetting news store')
    set({
      articles: [],
      favouriteArticleIds: new Set(),
      activeTab: 'popular',
      isLoading: false,
      error: null,
    })
  },
}))

