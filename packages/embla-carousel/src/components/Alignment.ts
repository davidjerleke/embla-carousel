import { isNumber } from './utils'

export type AlignmentOptionType = 'start' | 'center' | 'end' | number

export type AlignmentType = {
  measure: (n: number) => number
}

export function Alignment(
  align: AlignmentOptionType,
  viewSize: number,
): AlignmentType {
  const predefined = { start, center, end }

  function start(): number {
    return 0
  }

  function center(n: number): number {
    return end(n) / 2
  }

  function end(n: number): number {
    return viewSize - n
  }

  function percent(): number {
    return viewSize * Number(align)
  }

  function measure(n: number): number {
    if (isNumber(align)) return percent()
    return predefined[align](n)
  }

  const self: AlignmentType = {
    measure,
  }
  return self
}
