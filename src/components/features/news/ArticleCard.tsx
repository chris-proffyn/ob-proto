import { Heart, ExternalLink } from 'lucide-react'
import { Card } from '@components/common/Card'
import type { ArticleCard as ArticleCardType } from '../../../types/news.types'
import { logger } from '@utils/logger'

interface ArticleCardProps {
  article: ArticleCardType
  onToggleFavourite?: (articleId: string) => void
  compact?: boolean
}

export function ArticleCard({ article, onToggleFavourite, compact = false }: ArticleCardProps) {
  const handleFavouriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleFavourite) {
      logger.userAction('Article favourite toggled', { articleId: article.id })
      onToggleFavourite(article.id)
    }
  }

  const handleCardClick = () => {
    logger.userAction('Article card clicked', { articleId: article.id })
    window.open(article.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card onClick={handleCardClick} hover className="overflow-hidden">
      {article.thumbnail_url && !compact && (
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img
            src={article.thumbnail_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
            {article.title}
          </h3>
          {onToggleFavourite && (
            <button
              onClick={handleFavouriteClick}
              className={`p-1 rounded-full transition-colors flex-shrink-0 ${
                article.is_favourite
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label={article.is_favourite ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Heart
                className={`w-5 h-5 ${article.is_favourite ? 'fill-current' : ''}`}
              />
            </button>
          )}
        </div>

        {!compact && article.summary && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.summary}</p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            {article.champion && (
              <span className="bg-primary-50 text-primary-600 px-2 py-1 rounded">
                {article.champion}
              </span>
            )}
            {article.category && (
              <span className="capitalize">{article.category}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            <span>Read</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

