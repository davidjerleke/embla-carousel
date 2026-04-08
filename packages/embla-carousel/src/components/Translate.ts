import { AxisType } from './Axis'
import {
  roundToTwoDecimals,
  NumberStoreInputType,
  mapStoreToNumber
} from './utils'

export type TranslateType = {
  to: (input: NumberStoreInputType) => void
  toggleActive: (active: boolean) => void
  clear: () => void
}

export function Translate(axis: AxisType, node: HTMLElement): TranslateType {
  const getTranslate = axis.scroll === 'x' ? x : y
  const nodeStyle = node.style

  let previousTarget: number | null
  let disabled = false

  function x(input: number): string {
    return `translate3d(${input}px,0px,0px)`
  }

  function y(input: number): string {
    return `translate3d(0px,${input}px,0px)`
  }

  function to(input: number): void {
    if (disabled) return

    const newTarget = roundToTwoDecimals(axis.direction(input))
    if (newTarget === previousTarget) return
    nodeStyle.transform = getTranslate(newTarget)
    previousTarget = newTarget
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    nodeStyle.transform = ''
    if (!node.getAttribute('style')) node.removeAttribute('style')
  }

  const self: TranslateType = {
    clear,
    to: mapStoreToNumber(to),
    toggleActive
  }
  return self
}
