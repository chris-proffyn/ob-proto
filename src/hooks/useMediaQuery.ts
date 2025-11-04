import { useState, useEffect } from 'react'
import { logger } from '@utils/logger'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    logger.debug('Media query initialized', { query, matches: media.matches })

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = (e: MediaQueryListEvent) => {
      logger.debug('Media query changed', { query, matches: e.matches })
      setMatches(e.matches)
    }

    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 767px)')
}

export function useIsTablet() {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)')
}

