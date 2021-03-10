import { AxisType } from './axis'
import { DirectionType } from './direction'
import { roundToDecimals } from './utils'
import { Vector1DType } from './vector1d'

export type TranslateType = {
  clear: () => void
  to: (vector: Vector1DType) => void
  toggleActive: (active: boolean) => void
}

export function Translate(
  axis: AxisType,
  direction: DirectionType,
  container: HTMLElement,
): TranslateType {
  const containerStyle = container.style
  const translate = axis.scroll === 'x' ? x : y
  const roundToTwoDecimals = roundToDecimals(2)

  let disabled = false
  let location = 0

  function x(n: number): string {
    return `translate3d(${n}%,0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}%,0px)`
  }

  function to(v: Vector1DType): void {
    const target = roundToTwoDecimals(v.get())
    if (disabled || location === target) return

    getComputedStyle(container).transform
    containerStyle.transform = translate(direction.applyTo(target))
    location = target
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    containerStyle.transform = ''
    location = 0
  }

  const self: TranslateType = {
    clear,
    to,
    toggleActive,
  }
  return self
}
