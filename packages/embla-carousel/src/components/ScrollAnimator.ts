import { AnimationsRenderType, AnimationsUpdateType } from './Animations'
import { EngineType } from './Engine'

export type ScrollEventType = { isDragging: boolean }

export type ScrollAnimatorType = {
  update: AnimationsUpdateType
  render: AnimationsRenderType
}

export function ScrollAnimator(): ScrollAnimatorType {
  function update(engine: EngineType) {
    const {
      dragHandler,
      scrollBody,
      scrollBounds,
      options: { loop }
    } = engine

    if (!loop) scrollBounds.constrain(dragHandler.pointerDown())
    scrollBody.seek()
  }

  function render(engine: EngineType, alpha: number) {
    const {
      scrollBody,
      location,
      offsetLocation,
      previousLocation,
      scrollLooper,
      slideLooper,
      dragHandler,
      animation,
      eventHandler,
      scrollBounds,
      slidesScroller,
      options: { loop }
    } = engine

    const isIdle = scrollBody.settled()
    const isWithinBounds = !scrollBounds.shouldConstrain()
    const isPointerDown = dragHandler.pointerDown()

    const canSettle = loop || isWithinBounds
    const isReadyToSettle = isIdle && canSettle

    const isScrolling = !isReadyToSettle
    const isDragging = isScrolling && isPointerDown
    const isSettled = isReadyToSettle && !isPointerDown

    const scrollEvent = eventHandler.createEvent('scroll', { isDragging })
    const settleEvent = eventHandler.createEvent('settle', null)

    if (isScrolling) {
      scrollEvent.emitBefore()
    }
    if (isSettled) {
      slidesScroller.scroll(isSettled)
      settleEvent.emitBefore()
      animation.stop()
    }

    const interpolatedLocation =
      location.get() * alpha + previousLocation.get() * (1 - alpha)

    offsetLocation.set(interpolatedLocation)

    if (loop) {
      scrollLooper.loop(scrollBody.direction())
      slideLooper.loop()
    }

    slidesScroller.scroll()

    if (isScrolling) {
      scrollEvent.emitAfter()
    }
    if (isSettled) {
      settleEvent.emitAfter()
    }
  }

  const self: ScrollAnimatorType = {
    update,
    render
  }
  return self
}
