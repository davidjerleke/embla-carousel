import { isString } from './utils'

export type AlignmentOptionType =
  | 'start'
  | 'center'
  | 'end'
  | ((viewSize: number, snapSize: number, index: number) => number)

export type AlignmentType = {
  measure: (input: number, index: number) => number
}

export function Alignment(
  align: AlignmentOptionType,
  viewSize: number
): AlignmentType {
  const predefined = { start, center, end }

  function start(): number {
    return 0
  }

  function center(input: number): number {
    return end(input) / 2
  }

  function end(input: number): number {
    return viewSize - input
  }

  function measure(input: number, index: number): number {
    if (isString(align)) return predefined[align](input)
    return align(viewSize, input, index)
  }

  const self: AlignmentType = {
    measure
  }
  return self
}
