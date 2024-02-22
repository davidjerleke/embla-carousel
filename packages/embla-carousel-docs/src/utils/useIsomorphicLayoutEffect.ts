import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from './isBrowser'

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
