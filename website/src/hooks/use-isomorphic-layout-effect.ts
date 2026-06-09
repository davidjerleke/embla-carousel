import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from '@/utils/is-browser'

export const useIsomorphicLayoutEffect = isBrowser()
  ? useLayoutEffect
  : useEffect
