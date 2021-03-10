import { Limit, LimitType } from './limit'
import { arrayLast } from './utils'

export type ScrollLimitType = {
  limit: LimitType
}

export function ScrollLimit(
  contentSize: number,
  scrollSnaps: number[],
  loop: boolean,
): ScrollLimitType {
  const limit = measureLimit()

  function measureLimit(): LimitType {
    const startSnap = scrollSnaps[0]
    const endSnap = arrayLast(scrollSnaps)
    const min = loop ? startSnap - contentSize : endSnap
    const max = startSnap
    return Limit(min, max)
  }

  const self: ScrollLimitType = {
    limit,
  }
  return self
}
