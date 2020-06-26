import { Axis } from './axis'
import { roundToDecimals } from './utils'
import { Vector1D } from './vector1d'

type Params = {
  axis: Axis
  container: HTMLElement
}

export type Translate = {
  clear: () => void
  to: (vector: Vector1D) => void
  toggleActive: (active: boolean) => void
}

export function Translate(params: Params): Translate {
  const { axis, container } = params
  const translates = { x, y }
  const translateAxis = translates[axis.scroll]
  const roundToTwoDecimals = roundToDecimals(2)
  const containerStyle = container.style
  let disabled = false
  let location = 0

  function x(n: number): string {
    return `translate3d(${n}%,0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}%,0px)`
  }

  function to(v: Vector1D): void {
    if (disabled) return
    const target = roundToTwoDecimals(v.get())

    if (location !== target) {
      getComputedStyle(container).transform
      containerStyle.transform = translateAxis(target)
      location = target
    }
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
