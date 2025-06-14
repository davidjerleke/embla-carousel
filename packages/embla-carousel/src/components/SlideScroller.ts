import { Counter, CounterType } from './Counter'
import { SlideLooperType } from './SlideLooper'
import { SlideRegistryType } from './SlideRegistry'
import { TranslateType } from './Translate'
import { Vector1DType } from './Vector1d'

// TODO: Remove translate.set()?
// TODO: Fix resize problem with slides overlapping
// TODO: Cleanup and optimize this file
// TODO: In Translate file, add support for cross axis translation
// TODO: In Translate file, add support for resting translate meaning translateX and translateY
// without GPU acceleration when carousel is off screen

type SlideBoundType = {
  start: number
  end: number
}

type SlideBoundMapType = {
  [key: number]: SlideBoundType[]
}

export type SlideScrollerType = {
  scroll: () => void
}

export function SlideScroller(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  snaps: number[],
  slideIndexes: number[],
  loop: boolean,
  indexCurrent: CounterType,
  slideRegistry: SlideRegistryType['slideRegistry'],
  offsetlocation: Vector1DType,
  target: Vector1DType,
  slideTranslates: TranslateType[],
  slideLooper: SlideLooperType
): SlideScrollerType {
  const inViewThreshold = -200
  const inViewOffsets = loop ? [0, contentSize, -contentSize] : [0]
  const inViewBounds = createSlideBounds()
  const slideIndex = Counter(snaps.length - 1, 0, loop)

  let rangeStart = 0
  let rangeEnd = 0
  let previousTarget = target.get()
  let inViewSlides: number[] = getSlidesInViewRange()
  let inViewSlidesPrevious: number[] = inViewSlides
  let leftViewSlides: number[] = filterNotIncluded(slideIndexes, inViewSlides)

  function filterNotIncluded(source: number[], exclusion: number[]): number[] {
    return source.filter((item) => !exclusion.includes(item))
  }

  function createSlideBound(index: number, snap: number): SlideBoundType[] {
    return inViewOffsets.map((inViewOffset) => {
      return {
        start: snap - slideSizes[index] + inViewThreshold + inViewOffset,
        end: snap + viewSize - inViewThreshold + inViewOffset
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

  function isSlideInView(index: number): boolean {
    return inViewBounds[index].some(({ start, end }) => {
      return start < rangeStart && end > rangeEnd
    })
  }

  function collectSlidesInView(
    inViewList: number[],
    startIndex: number,
    direction: 1 | -1
  ): void {
    slideIndex.set(startIndex)
    slideIndex.set(slideIndex.add(direction).get())

    while (slideIndex.get() !== startIndex) {
      const index = slideIndex.get()
      if (!isSlideInView(index)) break

      inViewList.push(index)
      slideIndex.set(slideIndex.add(direction).get())
    }
  }

  function getSlidesInViewRange(): number[] {
    const start = performance.now() // TODO: Remove

    const location = offsetlocation.get()
    const destination = target.get()
    const snap = slideRegistry[indexCurrent.get()]
    const startIndex = snap[Math.floor(snap.length / 2)]
    const inViewList: number[] = []

    rangeStart = Math.max(location, destination)
    rangeEnd = Math.min(location, destination)

    if (isSlideInView(startIndex)) inViewList.push(startIndex)
    collectSlidesInView(inViewList, startIndex, 1)
    collectSlidesInView(inViewList, startIndex, -1)

    console.log(`getSlidesInViewRange took ${performance.now() - start}ms`)
    return inViewList
  }

  function updateSlideVisibility(): void {
    const newTarget = target.get()
    if (newTarget === previousTarget) return

    inViewSlides = getSlidesInViewRange()
    leftViewSlides = filterNotIncluded(inViewSlidesPrevious, inViewSlides)
    inViewSlidesPrevious = inViewSlides
    previousTarget = newTarget
  }

  function scroll(): void {
    updateSlideVisibility()

    inViewSlides.forEach((index) => {
      const translate = slideTranslates[index]
      const loopSlide = slideLooper.loopPoints[index]
      const loopOffset = loop && loopSlide ? loopSlide.target() : 0
      translate.to(offsetlocation.get() + loopOffset)
    })
    leftViewSlides.forEach((index) => {
      const translate = slideTranslates[index]
      translate.set('translateY(-400px)')
    })
  }

  const self: SlideScrollerType = {
    scroll
  }
  return self
}
