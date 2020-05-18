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
}

export function Translate(params: Params): Translate {
  const { axis, container } = params
  const translates = { x, y }
  const translateAxis = translates[axis.scroll]
  const roundToTwoDecimals = roundToDecimals(2)
  const containerStyle = container.style
  let location = 0

  function x(n: number): string {
    return `translate3d(${n}%,0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}%,0px)`
  }

  function to(v: Vector1D): void {
    const target = roundToTwoDecimals(v.get())
    if (location === target) return

    getComputedStyle(container).transform
    containerStyle.transform = translateAxis(target)
    location = target
  }

  function clear() {
    containerStyle.transform = ''
    location = 0
  }

  const self: Translate = {
    clear,
    to,
  }
  return Object.freeze(self)
}
