import { BREAKPOINTS } from '@/utils/breakpoints'
import { useWindowSize } from '@/hooks/use-window-size'

type UseBreakpointsType = {
  isCompact: boolean
  isDesktop: boolean
}

export function useBreakpoints(): UseBreakpointsType {
  const { windowWidth } = useWindowSize()
  const isCompact = windowWidth < BREAKPOINTS.MD
  const isDesktop = !isCompact

  return { isCompact, isDesktop }
}
