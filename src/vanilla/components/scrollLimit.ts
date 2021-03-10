import { Limit } from './limit'
import { arrayLast } from './utils'

type Params = {
  loop: boolean
  contentSize: number
  scrollSnaps: number[]
}

export type ScrollLimit = {
  limit: Limit
}

export function ScrollLimit(params: Params): ScrollLimit {
  const { loop, contentSize, scrollSnaps } = params
  const limit = measureLimit()

  function measureLimit(): Limit {
    const startSnap = scrollSnaps[0]
    const endSnap = arrayLast(scrollSnaps)
    const min = loop ? startSnap - contentSize : endSnap
    const max = startSnap
    return Limit({ min, max })
  }

  const self: ScrollLimit = {
    limit,
  }
  return self
}
