import { ReactNode } from 'react'
import { logger } from '@utils/logger'
import { useEffect } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  useEffect(() => {
    logger.debug('Card rendered', { hasOnClick: !!onClick, hover })
  }, [onClick, hover])

  const baseClasses = 'bg-white rounded-lg shadow'
  const hoverClasses = hover ? 'transition-shadow hover:shadow-lg cursor-pointer' : ''
  const clickClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

