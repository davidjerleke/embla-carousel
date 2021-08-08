import { AxisType } from './axis'
import { DirectionType } from './direction'
import { Vector1DType } from './vector1d'
import { LimitType } from './limit'

export type TranslateType = {
  clear: () => void
  to: (vector: Vector1DType) => void
  toggleActive: (active: boolean) => void
}

export function Translate(
  axis: AxisType,
  direction: DirectionType,
  container: HTMLElement,
  dragBreakAtFirstLastIndex: boolean,
  limit: LimitType
): TranslateType {
  const containerStyle = container.style
  const translate = axis.scroll === 'x' ? x : y
  let disabled = false

  function dragGetExtremityLimit(n: number): number {
    function dragLimitReached(n: number): { reached: boolean, n: number } {
      let r = {
        'reached': false,
        'n': 0
      };
  
      if (n >= limit.max)
        r = { 'reached': true, 'n': limit.max };
      else if (n <= limit.min)
        r = { 'reached': true, 'n': limit.min };
      
      return r;
    }

    const _dragLimitReached = dragLimitReached(n);

      if (_dragLimitReached.reached)
        return _dragLimitReached.n;
      
      return n;
  }

  function x(n: number): string {
    if (dragBreakAtFirstLastIndex)
      n = dragGetExtremityLimit(n);

    return `translate3d(${n}%,0px,0px)`
  }

  function y(n: number): string {
    if (dragBreakAtFirstLastIndex)
      n = dragGetExtremityLimit(n);

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
