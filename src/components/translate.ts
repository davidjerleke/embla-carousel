import { Vector1D } from './vector1d'

type Translates = 'x' | 'x3d'
type State = { type: Translates }

export type Translate = {
  to: (vector: Vector1D) => Translate
  useType: (type: Translates) => Translate
}

export function Translate(node: HTMLElement): Translate {
  const translate: State = { type: 'x' }
  const translates = { x, x3d }

  function x(xValue: number): string {
    return `translateX(${xValue}%)`
  }

  function x3d(xValue: number): string {
    return `translate3d(${xValue}%,0px,0px)`
  }

  function to(vector: Vector1D): Translate {
    const t = translate.type
    const v = vector.get()
    node.style.transform = translates[t](v)
    return self
  }

  function useType(type: Translates): Translate {
    translate.type = type
    return self
  }

  const self: Translate = {
    to,
    useType,
  }
  return Object.freeze(self)
}
