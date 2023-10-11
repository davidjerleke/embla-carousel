import { isString } from './utils'

export type AlignmentOptionType =
  | 'start'
  | 'center'
  | 'end'
  | ((viewSize: number, snapSize: number, index: number) => number)

export type AlignmentType = {
  measure: (n: number, index: number) => number
}

export function Alignment(
  align: AlignmentOptionType,
  viewSize: number
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

  function measure(n: number, index: number): number {
    if (isString(align)) return predefined[align](n)
    return align(viewSize, n, index)
  }

  const self: AlignmentType = {
    measure
  }
  return self
}
