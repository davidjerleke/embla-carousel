import { AxisType } from './Axis'
import {
  roundToTwoDecimals,
  VectorOrNumberType,
  mapVectorToNumber
} from './utils'

export type TranslateType = {
  set: (translate: string) => void
  get: (input: VectorOrNumberType) => string
  to: (input: VectorOrNumberType) => void
  setIsScrolling: (active: boolean) => void
  toggleActive: (active: boolean) => void
  clear: () => void
}

export function Translate(
  axis: AxisType,
  node: HTMLElement,
  unit: 'px' | '%' = 'px'
): TranslateType {
  const getTranslate = axis.scroll === 'x' ? x : y

  let lastTranslate: string | null = null
  let isScrolling = false
  let disabled = false

  function set(translate: string): void {
    if (lastTranslate === translate) return
    lastTranslate = translate
    node.style.transform = translate
  }

  function x(input: number): string {
    return `translate3d(${input}${unit},0px,0px)`
  }

  function y(input: number): string {
    return `translate3d(0px,${input}${unit},0px)`
  }

  function setIsScrolling(active: boolean): void {
    if (disabled) return
    if (isScrolling === active) return

    isScrolling = active
    const transform = active ? getTranslate(0) : ''
    set(transform)
  }

  function to(input: number): void {
    if (disabled) return
    if (!isScrolling) setIsScrolling(true)

    const newTarget = roundToTwoDecimals(axis.direction(input))
    set(getTranslate(newTarget))
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
    to: mapVectorToNumber(to),
    get: mapVectorToNumber(getTranslate),
    toggleActive,
    setIsScrolling
  }
  return self
}
