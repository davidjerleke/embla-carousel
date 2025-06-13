import { Counter, CounterType } from './Counter'
import { LimitType } from './Limit'
import { SlideRegistryType } from './SlideRegistry'
import { Vector1DType } from './Vector1d'

// TODO: Remove translate.set()?
// TODO: Fix resize problem with slides overlapping
// TODO: Cleanup and optimize this file

export type SlideBoundType = {
  start: number
  end: number
  index: number
}

type SlideBoundMapType = {
  [key: number]: SlideBoundType[]
}

export type ScrollOptimizerType = {
  getSlides: () => { slidesInView: number[]; slidesLeftView: number[] }
}

export function ScrollOptimizer(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  snaps: number[],
  limit: LimitType,
  loop: boolean,
  indexCurrent: CounterType,
  slideRegistry: SlideRegistryType['slideRegistry'],
  location: Vector1DType,
  target: Vector1DType
): ScrollOptimizerType {
  // const { removeOffset, constrain } = limit
  // const roundingSafety = 0.5
  const loopOffsets = loop ? [0, contentSize, -contentSize] : [0]

  const slideThreshold = -200
  const slideBounds = createSlideBounds()
  const slideIndex = Counter(snaps.length - 1, 0, loop)

  let lastTarget = target.get()
  let inViewSlides: number[] = getSlidesInViewRange(
    location.get(),
    target.get()
  )
  let inViewPreviousSlides: number[] = inViewSlides
  let leftViewSlides: number[] = []

  function createSlideBound(index: number, snap: number): SlideBoundType[] {
    return loopOffsets.map((offset) => {
      return {
        index,
        start: snap - slideSizes[index] + slideThreshold + offset,
        end: snap + viewSize - slideThreshold + offset
      }
    })
  }

  function createSlideBounds(): SlideBoundMapType {
    return snaps.reduce((acc, snap, index) => {
      return {
        ...acc,
        [index]: createSlideBound(index, snap)
      }
    }, {})
  }

  function isSlideInView(index: number, max: number, min: number): boolean {
    return slideBounds[index].some(({ start, end }) => {
      return start < max && end > min
    })
  }

  function getSlidesInViewRange(position: number, target: number): number[] {
    const start = performance.now()

    // const limitedLocation = loop ? removeOffset(position) : constrain(position)
    // const limitedTarget = loop ? removeOffset(target) : constrain(target)
    const max = Math.max(position, target)
    const min = Math.min(position, target)
    const snap = slideRegistry[indexCurrent.get()]
    const referenceIndex = snap[Math.floor(snap.length / 2)]

    let slidesInView: number[] = []

    if (isSlideInView(referenceIndex, max, min)) {
      slidesInView.push(referenceIndex)
    }

    slideIndex.set(referenceIndex)
    slideIndex.set(slideIndex.add(1).get())

    while (slideIndex.get() !== referenceIndex) {
      if (isSlideInView(slideIndex.get(), max, min)) {
        slidesInView.push(slideIndex.get())
        slideIndex.set(slideIndex.add(1).get())
      } else {
        break
      }
    }

    slideIndex.set(referenceIndex)
    slideIndex.set(slideIndex.add(-1).get())

    while (slideIndex.get() !== referenceIndex) {
      if (isSlideInView(slideIndex.get(), max, min)) {
        slidesInView.push(slideIndex.get())
        slideIndex.set(slideIndex.add(-1).get())
      } else {
        break
      }
    }

    console.log(`getSlidesInViewRange took ${performance.now() - start}ms`)
    return slidesInView
  }

  function getSlides(): { slidesInView: number[]; slidesLeftView: number[] } {
    if (lastTarget === target.get()) {
      return {
        slidesInView: inViewSlides,
        slidesLeftView: leftViewSlides
      }
    }
    lastTarget = target.get()

    inViewSlides = getSlidesInViewRange(location.get(), target.get())
    leftViewSlides = inViewPreviousSlides.filter(
      (id) => !inViewSlides.includes(id)
    )

    console.log('Slides in view:', inViewSlides)
    // console.log('Slides left view:', leftViewSlides)
    // console.log('-------------')

    inViewPreviousSlides = inViewSlides

    return { slidesInView: inViewSlides, slidesLeftView: leftViewSlides }
  }

  const self: ScrollOptimizerType = {
    getSlides
  }
  return self
}
