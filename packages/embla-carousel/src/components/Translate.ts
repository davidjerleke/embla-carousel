import { AxisType } from './Axis'
import { roundToTwoDecimals } from './utils'

export type TranslateType = {
  get: (n: number) => string
  to: (target: number) => void
  toggleActive: (active: boolean) => void
  clear: () => void
}

export function Translate(
  axis: AxisType,
  node: HTMLElement,
  unit: 'px' | '%' = 'px'
): TranslateType {
  const getTranslate = axis.scroll === 'x' ? x : y

  let previousTarget: number | null = null
  let disabled = false

  function set(translate: string): void {
    node.style.transform = translate
  }

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

    set(getTranslate(newTarget))
    previousTarget = newTarget
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    set('')
    if (!node.getAttribute('style')) node.removeAttribute('style')
  }

  const self: TranslateType = {
    clear,
    to,
    toggleActive,
    get: getTranslate
  }
  return self
}
