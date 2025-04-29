import { Counter, CounterType } from './Counter'
import { SlideLooperType } from './SlideLooper'
import { ScrollSnapListType } from './ScrollSnapList'
import { TranslateType } from './Translate'
import { arrayIsLastIndex } from './utils'
import { Vector1DType } from './Vector1d'
import { EventHandlerType } from './EventHandler'

export type ScrollOptimizeEventType = {
  inViewSlides: number[]
  leftViewSlides: number[]
}

type SlideBoundType = {
  start: number
  end: number
}

type SlideBoundMapType = {
  [key: number]: SlideBoundType[]
}

export type ScrollOptimizerType = {
  getSlidesInViewRange: (from?: Vector1DType, to?: Vector1DType) => number[]
  optimize: (settle?: boolean) => void
}

export function ScrollOptimizer(
  viewSize: number,
  contentSize: number,
  slideSizes: number[],
  snaps: number[],
  loop: boolean,
  indexCurrent: CounterType,
  scrollSnapList: ScrollSnapListType,
  offsetlocation: Vector1DType,
  target: Vector1DType,
  slideTranslates: TranslateType[],
  slideLooper: SlideLooperType,
  eventHandler: EventHandlerType
): ScrollOptimizerType {
  const inViewThreshold = -200
  const inViewOffsets = loop ? [0, contentSize, -contentSize] : [0]
  const inViewBounds = createSlideBounds()
  const slideIndexCounter = Counter(snaps.length - 1, 0, loop)

  let previousTarget = target.get()
  let inViewSlides: number[] = getSlidesInViewRange()
  let inViewSlidesPrevious: number[] = inViewSlides
  let leftViewSlides: number[] = []

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

  function getIsSlideInView(
    rangeStart: number,
    rangeEnd: number
  ): (index: number) => boolean {
    return (index: number): boolean => {
      return inViewBounds[index].some(({ start, end }) => {
        return start < rangeStart && end > rangeEnd
      })
    }
  }

  function collectSlidesInView(
    inViewList: number[],
    startIndex: number,
    direction: 1 | -1,
    isSlideInView: (index: number) => boolean
  ): void {
    const slideIndex = slideIndexCounter.clone().set(startIndex)
    const getNextIndex = (): number => slideIndex.add(direction).get()

    slideIndex.set(getNextIndex())

    while (slideIndex.get() !== startIndex) {
      const index = slideIndex.get()

      if (!isSlideInView(index)) break
      inViewList.push(index)

      const nextIndex = getNextIndex()
      slideIndex.set(nextIndex)

      if (loop) continue

      const isStart = !nextIndex
      const isEnd = arrayIsLastIndex(snaps, nextIndex)
      if (isStart && direction === -1) break
      if (isEnd && direction === 1) break
    }
  }

  function getSlidesInViewRange(
    from: Vector1DType = offsetlocation,
    to: Vector1DType = target
  ): number[] {
    const inViewList: number[] = []
    const snap = scrollSnapList.slideGroupBySnap[indexCurrent.get()]
    if (!snap) return inViewList
    if (!snaps.length) return inViewList

    const location = from.get()
    const destination = to.get()
    const startIndex = snap[Math.floor(snap.length / 2)]
    const rangeStart = Math.max(location, destination)
    const rangeEnd = Math.min(location, destination)
    const isSlideInView = getIsSlideInView(rangeStart, rangeEnd)

    if (isSlideInView(startIndex)) inViewList.push(startIndex)
    collectSlidesInView(inViewList, startIndex, 1, isSlideInView)
    collectSlidesInView(inViewList, startIndex, -1, isSlideInView)

    return inViewList
  }

  function updateSlideVisibility(newTarget: number): void {
    inViewSlides = getSlidesInViewRange()
    leftViewSlides = filterNotIncluded(inViewSlidesPrevious, inViewSlides)
    inViewSlidesPrevious = inViewSlides
    previousTarget = newTarget
  }

  function toggleGpuLayer(enable: boolean, slides: number[]): void {
    slides.forEach((index) => {
      const translate = slideTranslates[index]
      const loopSlide = slideLooper.loopPoints[index]
      const loopOffset = loop && loopSlide ? loopSlide.target() : 0
      if (!loopOffset) translate.setIsScrolling(enable)
    })
  }

  function optimize(settle?: boolean): void {
    const newTarget = target.get()
    if (!settle && newTarget === previousTarget) return

    updateSlideVisibility(newTarget)

    const event = eventHandler.createEvent('scrolloptimize', {
      inViewSlides,
      leftViewSlides
    })
    const preventDefault = !event.emit()
    if (preventDefault) return

    toggleGpuLayer(true, inViewSlides)
    toggleGpuLayer(false, leftViewSlides)
  }

  const self: ScrollOptimizerType = {
    getSlidesInViewRange,
    optimize
  }
  return self
}
