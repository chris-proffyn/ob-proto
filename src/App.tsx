import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from '@components/common/ErrorBoundary'
import { ProtectedRoute } from '@components/features/auth/ProtectedRoute'
import { MainLayout } from '@components/layout/MainLayout'
import { logger } from '@utils/logger'
import { useEffect } from 'react'

// Pages
import HomePage from '@pages/HomePage'
import LoginPage from '@pages/LoginPage'
import SignupPage from '@pages/SignupPage'
import DashboardPage from '@pages/DashboardPage'
import NotFoundPage from '@pages/NotFoundPage'

import GoalsPage from '@pages/GoalsPage'
import NewsPage from '@pages/NewsPage'
import OwnershipPage from '@pages/OwnershipPage'
import ProfilePage from '@pages/ProfilePage'
import AccountDetailPage from '@pages/AccountDetailPage'
import GoalDetailPage from '@pages/GoalDetailPage'

function App() {
  useEffect(() => {
    logger.info('App initialized', {
      env: import.meta.env.MODE,
      timestamp: new Date().toISOString(),
    })
  }, [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accounts/:id"
              element={
                <ProtectedRoute>
                  <AccountDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <GoalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals/:id"
              element={
                <ProtectedRoute>
                  <GoalDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/news"
              element={
                <ProtectedRoute>
                  <NewsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ownership"
              element={
                <ProtectedRoute>
                  <OwnershipPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback routes */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </MainLayout>

        {/* Global toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
