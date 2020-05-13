import { Axis } from './axis'
import { roundToDecimals } from './utils'
import { Vector1D } from './vector1d'

type Params = {
  axis: Axis
  container: HTMLElement
}

export type Translate = {
  to: (vector: Vector1D) => void
}

export function Translate(params: Params): Translate {
  const { axis, container } = params
  const translateType = { x, y }[axis.scroll]
  const roundToTwoDecimals = roundToDecimals(2)
  let translate = 0

  function x(n: number): string {
    return `translate3d(${n}%,0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}%,0px)`
  }

  function to(v: Vector1D): void {
    const target = roundToTwoDecimals(v.get())
    if (translate === target) return

    getComputedStyle(container).transform
    container.style.transform = translateType(target)
    translate = target
  }

  const self: Translate = {
    to,
  }
  return Object.freeze(self)
}
