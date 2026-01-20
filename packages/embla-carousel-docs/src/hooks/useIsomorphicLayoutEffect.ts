import { useEffect, useLayoutEffect } from 'react'
import { isBrowser } from 'utils/isBrowser'

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect
