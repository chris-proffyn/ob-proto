import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupForm } from '@components/features/auth/SignupForm'
import { useAuth } from '@hooks/useAuth'
import { logger } from '@utils/logger'
import { Card } from '@components/common/Card'

export default function SignupPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logger.componentMounted('SignupPage')

    if (isAuthenticated) {
      logger.info('User already authenticated, redirecting to dashboard')
      navigate('/dashboard')
    }

    return () => logger.componentUnmounted('SignupPage')
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600">Start your financial journey today</p>
          </div>
          <SignupForm />
        </Card>
      </div>
    </div>
  )
}

