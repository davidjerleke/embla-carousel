import { Axis } from './axis'
import { Direction } from './direction'
import { roundToDecimals } from './utils'
import { Vector1D } from './vector1d'

export type Translate = {
  clear: () => void
  to: (vector: Vector1D) => void
  toggleActive: (active: boolean) => void
}

export function Translate(
  axis: Axis,
  direction: Direction,
  container: HTMLElement,
): Translate {
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

  function to(v: Vector1D): void {
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

  const self: Translate = {
    clear,
    to,
    toggleActive,
  }
  return self
}
