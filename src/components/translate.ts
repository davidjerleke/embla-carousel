import { Vector1D } from './vector1d'

export type Translate = {
  to: (vector: Vector1D) => void
}

export function Translate(node: HTMLElement): Translate {
  const nodeStyle = node.style

  function x(xValue: number): string {
    return `translate3d(${xValue}%,0px,0px)`
  }

  function to(vector: Vector1D): void {
    nodeStyle.transform = x(vector.get())
  }

  const self: Translate = {
    to,
  }
  return Object.freeze(self)
}
