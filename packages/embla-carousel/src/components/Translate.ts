import { AxisType } from './Axis'
import { roundToTwoDecimals, setNodeStyle } from './utils'

export type TranslateType = {
  get: (n: number) => string
  to: (target: number) => void
  setIsActive: (active: boolean) => void
  clear: () => void
  setIsScrolling: (active: boolean) => void
}

export function Translate(
  axis: AxisType,
  slide: HTMLElement,
  unit: 'px' | '%' = 'px'
): TranslateType {
  const setTransform = setNodeStyle(slide, 'transform')
  const setPointerEvents = setNodeStyle(slide, 'pointer-events')
  const setVisibility = setNodeStyle(slide, 'visibility')
  const getTranslate = axis.scroll === 'x' ? x : y

  let previousTarget: number | null = null
  let isScrolling = false
  let disabled = false

  function x(n: number): string {
    return `translate3d(${n}${unit},0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}${unit},0px)`
  }

  function to(target: number): void {
    if (disabled) return

    const newTarget = roundToTwoDecimals(axis.direction(target))
    if (newTarget === previousTarget) return
    if (!isScrolling) setIsScrolling(true)

    setTransform(getTranslate(newTarget))
    previousTarget = newTarget
  }

  function setIsScrolling(active: boolean): void {
    if (disabled) return
    isScrolling = active
    setPointerEvents(active ? '' : 'none')
    setVisibility(active ? '' : 'hidden')
    if (!active) setTransform('')
  }

  function setIsActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    setTransform('')
    setPointerEvents('')
    setVisibility('')
    if (!slide.getAttribute('style')) slide.removeAttribute('style')
  }

  const self: TranslateType = {
    clear,
    to,
    setIsActive,
    get: getTranslate,
    setIsScrolling
  }
  return self
}
