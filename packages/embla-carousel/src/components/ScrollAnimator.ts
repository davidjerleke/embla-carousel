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
      translate,
      location,
      offsetLocation,
      previousLocation,
      scrollLooper,
      slideLooper,
      dragHandler,
      animation,
      eventHandler,
      scrollBounds,
      scrollOptimizer,
      options: { loop }
    } = engine

    const isIdle = scrollBody.settled()
    const isWithinBounds = !scrollBounds.shouldConstrain()
    const isPointerDown = dragHandler.pointerDown()

    const canSettle = loop || isWithinBounds
    const isIdleAndCanSettle = isIdle && canSettle

    const isScrolling = !isIdleAndCanSettle
    const isDragging = isScrolling && isPointerDown
    const isSettled = isIdleAndCanSettle && !isPointerDown

    if (isSettled) {
      scrollOptimizer.optimize(isSettled)
      animation.stop()
    }

    const interpolatedLocation =
      location.get() * alpha + previousLocation.get() * (1 - alpha)

    offsetLocation.set(interpolatedLocation)

    if (loop) {
      scrollLooper.loop(scrollBody.direction())
      slideLooper.loop()
    }

    translate.to(offsetLocation)
    scrollOptimizer.optimize()

    if (isSettled) {
      const event = eventHandler.createEvent('settle', null)
      event.emit()
    }
    if (isScrolling) {
      const event = eventHandler.createEvent('scroll', { isDragging })
      event.emit()
    }
  }

  const self: ScrollAnimatorType = {
    update,
    render
  }
  return self
}
