import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { logger } from '@utils/logger'
import { Button } from '@components/common/Button'
import { Card } from '@components/common/Card'

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logger.componentMounted('HomePage')

    if (isAuthenticated) {
      navigate('/dashboard')
    }

    return () => logger.componentUnmounted('HomePage')
  }, [isAuthenticated, navigate])

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Outbehaving
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your intelligent digital life and wealth companion
        </p>
        <Card className="p-8 mb-8">
          <p className="text-gray-700 mb-6">
            Take control of your career, finances, and future through intelligent,
            AI-powered support that adapts to every stage of your financial journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/signup')}
              variant="primary"
              size="lg"
            >
              Get Started
            </Button>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              size="lg"
            >
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

