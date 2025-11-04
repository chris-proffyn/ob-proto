import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Target, Newspaper, Award, User } from 'lucide-react'
import { logger } from '@utils/logger'
import { useEffect } from 'react'

interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/news', label: 'News', icon: Newspaper },
  { path: '/ownership', label: 'Ownership', icon: Award },
  { path: '/profile', label: 'Profile', icon: User },
]

export function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    logger.debug('BottomNavigation rendered', { currentPath: location.pathname })
  }, [location.pathname])

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const handleNavClick = (path: string) => {
    logger.userAction('Bottom navigation clicked', { path })
    navigate(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

