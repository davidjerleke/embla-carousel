import { Vector1D } from './vector1d'

export type Translate = {
  to: (vector: Vector1D) => void
}

export function Translate(node: HTMLElement): Translate {
  const nodeStyle = node.style
  const state = { value: 0 }

  function roundToTwoDecimals(n: number): number {
    return Math.round(n * 100) * 0.01
  }

  function translateX(n: number): string {
    return `translate3d(${n}%,0px,0px)`
  }

  function to(v: Vector1D): void {
    const target = roundToTwoDecimals(v.get())
    if (state.value !== target) {
      state.value = target
      // @ts-ignore
      getComputedStyle(node).transform
      nodeStyle.transform = translateX(target)
    }
  }

  const self: Translate = {
    to,
  }
  return Object.freeze(self)
}
