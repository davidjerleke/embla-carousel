import { AxisType } from './Axis'
import { roundToTwoDecimals } from './utils'

export type TranslateType = {
  set: (translate: string) => void
  get: (n: number) => string
  to: (target: number) => void
  toggleActive: (active: boolean) => void
  clear: () => void
  setIsScrolling: (active: boolean) => void
}

export function Translate(
  axis: AxisType,
  node: HTMLElement,
  unit: 'px' | '%' = 'px'
): TranslateType {
  const getTranslate = axis.scroll === 'x' ? x : y
  let isScrolling = false

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

  function setIsScrolling(active: boolean): void {
    if (disabled) return
    if (isScrolling === active) return

    isScrolling = active
    const transform = active ? getTranslate(0) : ''
    set(transform)
  }

  function to(target: number): void {
    if (disabled) return

    const newTarget = roundToTwoDecimals(axis.direction(target))
    if (newTarget === previousTarget) return
    if (!isScrolling) setIsScrolling(true)

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
    set,
    clear,
    to,
    toggleActive,
    get: getTranslate,
    setIsScrolling
  }
  return self
}
