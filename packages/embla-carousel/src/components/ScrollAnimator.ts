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
      // translate,
      slideTranslates,
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

    // TODO: Cleanup
    const { slidesInView, slidesLeftView } = scrollOptimizer.getSlides()
    slidesLeftView.forEach((index) => {
      const translate = slideTranslates[index]
      translate.set('translateY(-400px)')
    })
    slidesInView.forEach((index) => {
      const translate = slideTranslates[index]
      const loopSlide = engine.slideLooper.loopPoints[index]
      const loopOffset = loop && loopSlide ? loopSlide.target() : 0
      translate.to(engine.offsetLocation.get() + loopOffset)
    })
    // TODO: Cleanup

    // translate.to(offsetLocation.get())
    // slideTranslates.forEach((translate, index) => {
    //   const loopSlide = engine.slideLooper.loopPoints[index]
    //   const loopOffset = loop && loopSlide ? loopSlide.target() : 0
    //   translate.to(engine.offsetLocation.get() + loopOffset)
    // })

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
