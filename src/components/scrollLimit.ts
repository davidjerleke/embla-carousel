import { ChunkSize } from './chunkSize'
import { Limit } from './limit'

type Params = {
  chunkSize: ChunkSize
  contentSize: number
  loop: boolean
}

export type ScrollLimit = {
  measure: (scrollSnaps: number[]) => Limit
}

export function ScrollLimit(params: Params): ScrollLimit {
  const { contentSize, chunkSize, loop } = params
  const loopSize = -contentSize + chunkSize.measure(1)

  function measure(scrollSnaps: number[]): Limit {
    const startSnap = scrollSnaps[0]
    const endSnap = scrollSnaps[scrollSnaps.length - 1]
    const max = startSnap
    const min = loop ? max + loopSize : endSnap
    return Limit({ max, min })
  }

  const self: ScrollLimit = {
    measure,
  }
  return Object.freeze(self)
}
