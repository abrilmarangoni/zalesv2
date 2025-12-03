import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return
    }

    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    // Use matchMedia if available, otherwise fallback to resize listener
    if (window.matchMedia) {
      try {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        
        // Safari compatibility: use addListener for older Safari versions
        const onChange = (e?: MediaQueryListEvent | MediaQueryList) => {
          const matches = e ? ('matches' in e ? e.matches : e.matches) : mql.matches
          setIsMobile(matches || window.innerWidth < MOBILE_BREAKPOINT)
        }
        
        // Modern browsers
        if (mql.addEventListener) {
          mql.addEventListener('change', onChange as (e: MediaQueryListEvent) => void)
        } else if (mql.addListener) {
          // Legacy Safari support - addListener takes MediaQueryList as parameter
          mql.addListener(onChange as (mql: MediaQueryList) => void)
        }
        
        // Set initial value
        setIsMobile(mql.matches || window.innerWidth < MOBILE_BREAKPOINT)
        
        return () => {
          if (mql.removeEventListener) {
            mql.removeEventListener('change', onChange as (e: MediaQueryListEvent) => void)
          } else if (mql.removeListener) {
            mql.removeListener(onChange as (mql: MediaQueryList) => void)
          }
        }
      } catch (error) {
        // Fallback to resize listener if matchMedia fails
        console.warn('matchMedia not supported, using resize listener:', error)
      }
    }

    // Fallback: use resize listener
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return !!isMobile
}
