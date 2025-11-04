import { useAuth } from '@hooks/useAuth'
import { useNews } from '@hooks/useNews'
import { ArticleCard } from '@components/features/news/ArticleCard'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ErrorMessage } from '@components/common/ErrorMessage'
import { Card } from '@components/common/Card'
import { Newspaper, Heart } from 'lucide-react'

export default function NewsPage() {
  const { user } = useAuth()
  const {
    articles,
    activeTab,
    isLoading,
    error,
    toggleFavourite,
    setActiveTab,
  } = useNews(user?.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-primary-600" />
          News & Articles
        </h1>
        <p className="text-gray-600 mt-1">Stay informed with curated content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('popular')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'popular'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Popular
        </button>
        <button
          onClick={() => setActiveTab('favourites')}
          className={`px-4 py-2 font-medium transition-colors flex items-center gap-2 ${
            activeTab === 'favourites'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          Favourites
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner size="lg" text="Loading articles..." />
      ) : error ? (
        <ErrorMessage message={error} title="Error Loading Articles" />
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {activeTab === 'favourites'
              ? 'No favourite articles yet'
              : 'No articles available'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'favourites'
              ? 'Start favouriting articles to see them here!'
              : 'Check back later for new content.'}
          </p>
        </Card>
      )}
    </div>
  )
}

