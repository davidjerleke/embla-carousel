import { AxisType } from './Axis'
import { DirectionType } from './Direction'
import { Vector1DType } from './Vector1d'

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
  let disabled = false

  function x(n: number): string {
    return `translate3d(${n}%,0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}%,0px)`
  }

  function to(target: Vector1DType): void {
    if (disabled) return
    containerStyle.transform = translate(direction.applyTo(target.get()))
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    containerStyle.transform = ''
  }

  const self: TranslateType = {
    clear,
    to,
    toggleActive,
  }
  return self
}
