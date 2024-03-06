import { AxisType } from './Axis'

export type TranslateType = {
  clear: () => void
  to: (target: number) => void
  toggleActive: (active: boolean) => void
}

export function Translate(
  axis: AxisType,
  container: HTMLElement
): TranslateType {
  const translate = axis.scroll === 'x' ? x : y
  const containerStyle = container.style
  let disabled = false

  function x(n: number): string {
    return `translate3d(${n}px,0px,0px)`
  }

  function y(n: number): string {
    return `translate3d(0px,${n}px,0px)`
  }

  function to(target: number): void {
    if (disabled) return
    containerStyle.transform = translate(axis.direction(target))
  }

  function toggleActive(active: boolean): void {
    disabled = !active
  }

  function clear(): void {
    if (disabled) return
    containerStyle.transform = ''
    if (!container.getAttribute('style')) container.removeAttribute('style')
  }

  const self: TranslateType = {
    clear,
    to,
    toggleActive
  }
  return self
}
