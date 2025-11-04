import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@components/common/Button'
import { logger } from '@utils/logger'
import { useAppStore } from '@store/appStore'

export function Header() {
  const { isAuthenticated, user, signOut } = useAuth()
  const navigate = useNavigate()
  const { mobileMenuOpen, setMobileMenuOpen } = useAppStore()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    logger.userAction('Sign out clicked')
    setIsSigningOut(true)
    await signOut()
    setIsSigningOut(false)
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 group"
              aria-label="Home"
            >
              <img
                src="/logos/ob-logo.svg"
                alt="Outbehaving logo"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  img.src = '/logos/ob-logo.png'
                }}
              />
              <span className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                Outbehaving
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-700 hover:text-primary-600 transition-colors px-3 py-2"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  {user?.email}
                </button>
                <Button onClick={handleSignOut} variant="outline" size="sm" isLoading={isSigningOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="sm"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  variant="primary"
                  size="sm"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Menu button - visible at all sizes */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation drawer - visible when open at all sizes */}
        {mobileMenuOpen && (
          <div className="py-4 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigate('/dashboard')
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    navigate('/profile')
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    navigate('/login')
                    setMobileMenuOpen(false)
                  }}
                  variant="outline"
                  fullWidth
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate('/signup')
                    setMobileMenuOpen(false)
                  }}
                  variant="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

