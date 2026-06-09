'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { scrollToHash } from '@/utils/scroll-to-hash'

export function ScrollToHashInit() {
  const pathname = usePathname()

  useEffect(() => {
    scrollToHash(window.location.hash)
  }, [pathname])

  useEffect(() => {
    function onHashChange() {
      scrollToHash(window.location.hash)
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return null
}
