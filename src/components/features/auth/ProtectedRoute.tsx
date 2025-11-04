import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { LoadingSpinner } from '@components/common/LoadingSpinner'
import { logger } from '@utils/logger'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  useEffect(() => {
    logger.debug('ProtectedRoute check', {
      isAuthenticated,
      isLoading,
      path: location.pathname,
    })
  }, [isAuthenticated, isLoading, location])

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Checking authentication..." />
  }

  if (!isAuthenticated) {
    logger.warn('Unauthorized access attempt', { path: location.pathname })
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

