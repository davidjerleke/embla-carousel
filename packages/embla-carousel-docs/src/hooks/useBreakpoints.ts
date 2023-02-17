import { BREAKPOINTS } from 'consts/breakpoints'
import { useWindowSize } from './useWindowSize'

type UseBreakpointsType = {
  isCompact: boolean
  isDesktop: boolean
}

export const useBreakpoints = (): UseBreakpointsType => {
  const { windowWidth } = useWindowSize()
  const isCompact = windowWidth < BREAKPOINTS.MD
  const isDesktop = !isCompact

  return { isCompact, isDesktop }
}
