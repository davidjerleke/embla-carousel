import { Limit } from './limit'
import { arrayLast } from './utils'

export type ScrollLimit = {
  limit: Limit
}

export function ScrollLimit(
  contentSize: number,
  scrollSnaps: number[],
  loop: boolean,
): ScrollLimit {
  const limit = measureLimit()

  function measureLimit(): Limit {
    const startSnap = scrollSnaps[0]
    const endSnap = arrayLast(scrollSnaps)
    const min = loop ? startSnap - contentSize : endSnap
    const max = startSnap
    return Limit(min, max)
  }

  const self: ScrollLimit = {
    limit,
  }
  return self
}
