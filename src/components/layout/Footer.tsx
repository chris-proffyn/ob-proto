import { logger } from '@utils/logger'
import { useEffect } from 'react'

export function Footer() {
  useEffect(() => {
    logger.componentMounted('Footer')
    return () => logger.componentUnmounted('Footer')
  }, [])

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Outbehaving. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

