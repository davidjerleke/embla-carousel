import { Vector1D } from './vector1d'

type Translates = 'x' | 'x3d'

export type Translate = {
  to: (vector: Vector1D) => Translate
  useDefault: () => Translate
  use3d: () => Translate
}

export function Translate(node: HTMLElement): Translate {
  const state = { translateType: 'x' as Translates }
  const translates = { x, x3d }

  function x(xValue: number): string {
    return `translateX(${xValue}%)`
  }

  function x3d(xValue: number): string {
    return `translate3d(${xValue}%,0px,0px)`
  }

  function to(vector: Vector1D): Translate {
    const t = state.translateType
    const v = vector.get()
    node.style.transform = translates[t](v)
    return self
  }

  function useType(type: Translates): Translate {
    state.translateType = type
    return self
  }

  const self: Translate = {
    to,
    use3d: () => useType('x3d'),
    useDefault: () => useType('x'),
  }
  return Object.freeze(self)
}
