import { useEffect, useCallback } from 'react'
import { useNewsStore } from '@store/newsStore'
import { databaseService } from '@services/supabase/database.service'
import { logger } from '@utils/logger'
import type { Article } from '../types/database.types'

export function useNews(userId?: string) {
  const {
    activeTab,
    isLoading,
    error,
    setArticles,
    toggleFavourite,
    setActiveTab,
    getFilteredArticles,
    setLoading,
    setError,
  } = useNewsStore()

  const loadArticles = useCallback(async () => {
    logger.info('Loading articles')
    setLoading(true)
    setError(null)

    try {
      const data = await databaseService.query<Article>('articles', {
        order: { column: 'created_at', ascending: false },
      })

      if (data) {
        setArticles(data)
      } else {
        setError('Failed to load articles')
      }
    } catch (err) {
      logger.error('Error loading articles', err as Error)
      setError('Failed to load articles')
    } finally {
      setLoading(false)
    }
  }, [setArticles, setLoading, setError])

  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  const markArticleAsRead = useCallback(
    async (articleId: string) => {
      if (!userId) return

      logger.info('Marking article as read', { userId, articleId })

      try {
        await databaseService.insert('user_article_reads', {
          user_id: userId,
          article_id: articleId,
        })
      } catch (err) {
        logger.error('Error marking article as read', err as Error)
      }
    },
    [userId]
  )

  const handleToggleFavourite = useCallback(
    (articleId: string) => {
      toggleFavourite(articleId)
      if (userId) {
        markArticleAsRead(articleId)
      }
    },
    [userId, toggleFavourite, markArticleAsRead]
  )

  return {
    articles: getFilteredArticles(),
    activeTab,
    isLoading,
    error,
    loadArticles,
    toggleFavourite: handleToggleFavourite,
    setActiveTab,
    markArticleAsRead,
  }
}

