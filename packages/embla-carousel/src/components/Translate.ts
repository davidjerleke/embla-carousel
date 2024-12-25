import { AxisType } from './Axis'
import { roundToTwoDecimals } from './utils'

export type TranslateType = {
  clear: () => void
  to: (target: number) => void
  toggleActive: (active: boolean) => void
  get: (n: number) => string
}

export function Translate(
  axis: AxisType,
  container: HTMLElement,
  unit?: 'px' | '%'
): TranslateType {
  const getTranslate = axis.scroll === 'x' ? x : y
  const transformUnit = unit || 'px'

  let previousTarget: number | null = null
  let disabled = false

  function x(n: number): string {
    return `translate3d(${n}${transformUnit},0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}${transformUnit},0px)`
  }

  function to(target: number): void {
    if (disabled) return

    const newTarget = roundToTwoDecimals(axis.direction(target))
    if (newTarget === previousTarget) return

    container.style.transform = getTranslate(newTarget)
    previousTarget = newTarget
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    container.style.transform = ''
    if (!container.getAttribute('style')) container.removeAttribute('style')
  }

  const self: TranslateType = {
    clear,
    to,
    toggleActive,
    get: getTranslate
  }
  return self
}
