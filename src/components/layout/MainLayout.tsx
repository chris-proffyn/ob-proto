import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { BottomNavigation } from './BottomNavigation'
import { logger } from '@utils/logger'
import { useEffect } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  useEffect(() => {
    logger.componentMounted('MainLayout')
    return () => logger.componentUnmounted('MainLayout')
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {children}
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  )
}

