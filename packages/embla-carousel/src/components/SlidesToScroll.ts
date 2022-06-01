import { arrayKeys, arrayLast, isNumber } from './utils'

export type SlidesToScrollOptionType = 'auto' | number

export type SlidesToScrollType = {
  groupSlides: <Type>(array: Type[]) => Type[][]
}

export function SlidesToScroll(
  viewSize: number,
  slideSizesWithGaps: number[],
  slidesToScroll: SlidesToScrollOptionType,
): SlidesToScrollType {
  const groupByNumber = isNumber(slidesToScroll)

  function byNumber<Type>(array: Type[], groupSize: number): Type[][] {
    return arrayKeys(array)
      .filter((i) => i % groupSize === 0)
      .map((i) => array.slice(i, i + groupSize))
  }

  function bySize<Type>(array: Type[]): Type[][] {
    return arrayKeys(array)
      .reduce((groupSizes: number[], i) => {
        const chunk = slideSizesWithGaps.slice(arrayLast(groupSizes), i + 1)
        const chunkSize = chunk.reduce((a, s) => a + s, 0)
        return !i || chunkSize > viewSize ? groupSizes.concat(i) : groupSizes
      }, [])
      .map((start, i, groupSizes) => array.slice(start, groupSizes[i + 1]))
  }

  function groupSlides<Type>(array: Type[]): Type[][] {
    return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array)
  }

  const self: SlidesToScrollType = {
    groupSlides,
  }
  return self
}
