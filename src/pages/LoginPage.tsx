import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '@components/features/auth/LoginForm'
import { useAuth } from '@hooks/useAuth'
import { logger } from '@utils/logger'
import { Card } from '@components/common/Card'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logger.componentMounted('LoginPage')

    if (isAuthenticated) {
      logger.info('User already authenticated, redirecting to dashboard')
      navigate('/dashboard')
    }

    return () => logger.componentUnmounted('LoginPage')
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
          <LoginForm />
        </Card>
      </div>
    </div>
  )
}

