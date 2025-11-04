import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { useGoals } from '@hooks/useGoals'
import { useNews } from '@hooks/useNews'
import { useOwnership } from '@hooks/useOwnership'
import { useUserStore } from '@store/userStore'
import { databaseService } from '@services/supabase/database.service'
import { GoalCard } from '@components/features/goals/GoalCard'
import { ArticleCard } from '@components/features/news/ArticleCard'
import { AccountCard } from '@components/features/profile/AccountCard'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { ProgressBar } from '@components/common/ProgressBar'
import { Card } from '@components/common/Card'
import { Button } from '@components/common/Button'
import { formatCurrency } from '@utils/formatters'
import { MEMBERSHIP_TIERS } from '@utils/constants'
import { logger } from '@utils/logger'
import { Trophy, TrendingUp, Newspaper, Target } from 'lucide-react'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { profile, accounts, setProfile, setAccounts } = useUserStore()
  const { goals, isLoading: goalsLoading } = useGoals(user?.id)
  const { articles, isLoading: newsLoading } = useNews(user?.id)
  const {
    membershipTier,
    progressToNextTier,
    engagementMetrics,
    isLoading: ownershipLoading,
  } = useOwnership(user?.id)

  useEffect(() => {
    logger.componentMounted('DashboardPage')

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const loadUserData = async () => {
      if (!user?.id) return

      // Load profile
      const profileData = await databaseService.getProfile(user.id)
      if (profileData) {
        setProfile(profileData as any)
      }

      // Load accounts
      const accountsData = await databaseService.query('accounts', {
        filters: { user_id: user.id },
      })
      if (accountsData) {
        setAccounts(accountsData as any)
      }
    }

    loadUserData()

    return () => logger.componentUnmounted('DashboardPage')
  }, [user, isAuthenticated, navigate, setProfile, setAccounts])

  if (!isAuthenticated) return null

  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0)
  const topGoals = goals.slice(0, 3)
  const latestArticles = articles.slice(0, 2)
  const tierInfo = MEMBERSHIP_TIERS[membershipTier]

  const isLoading = goalsLoading || newsLoading || ownershipLoading

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {profile?.name || user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 mt-1">Here's your financial overview</p>
          </div>
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-primary-600">
                {(profile?.name || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </Card>

      {isLoading ? (
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      ) : (
        <>
          {/* Goals Summary */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-600" />
                Your Goals
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/goals')}
              >
                View All
              </Button>
            </div>
            {topGoals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} compact />
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600 mb-4">No goals yet. Create your first goal!</p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/goals')}
                >
                  Create Goal
                </Button>
              </Card>
            )}
          </div>

          {/* Accounts Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Accounts
            </h2>
            {accounts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
                <Card className="p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                  <p className="text-sm text-gray-600 mb-2">Total Balance</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(totalBalance)}
                  </p>
                </Card>
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600">No accounts connected yet.</p>
              </Card>
            )}
          </div>

          {/* News Highlights */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-primary-600" />
                Latest News
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/news')}
              >
                View All
              </Button>
            </div>
            {latestArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} compact />
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-600">No articles available.</p>
              </Card>
            )}
          </div>

          {/* Ownership Snapshot */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary-600" />
                Membership Status
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/ownership')}
              >
                View Details
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {tierInfo.name} Member
                  </span>
                  <span className="text-sm text-gray-600">
                    {engagementMetrics.total_points} points
                  </span>
                </div>
                <ProgressBar
                  progress={progressToNextTier}
                  size="md"
                  color="primary"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {engagementMetrics.referrals}
                  </p>
                  <p className="text-sm text-gray-600">Referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {engagementMetrics.articles_read}
                  </p>
                  <p className="text-sm text-gray-600">Articles Read</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {engagementMetrics.days_active}
                  </p>
                  <p className="text-sm text-gray-600">Days Active</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

