import { defaultOptions, OptionsType } from './Options'
import { isNumber, clampNumber } from './utils'
import {
  CreatePluginType,
  EmblaCarouselType,
  OptionsHandlerType,
  ScrollBodyType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    fade: FadeType
  }
}

export type FadeType = CreatePluginType<
  {
    ssrStyles: (containerSelector: string, slidesSelector?: string) => string
  },
  OptionsType
>

export type FadeOptionsType = FadeType['options']

function Fade(userOptions: FadeOptionsType = {}): FadeType {
  const fullOpacity = 1
  const noOpacity = 0
  const fadeFriction = 0.68

  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let isSsr = false
  let destroyed = false

  let opacities: number[] = []
  let fadeToNextDistance: number
  let distanceFromPointerDown = 0
  let fadeVelocity = 0
  let progress = 0
  let shouldFadePair = false

  let defaultSettledBehaviour: ScrollBodyType['settled']
  let defaultProgressBehaviour: EmblaCarouselType['scrollProgress']

  function pluginIsActive(): boolean {
    if (isSsr) return false
    if (destroyed) return false
    return options.active
  }

  function init(
    emblaApiInstance: EmblaCarouselType,
    optionsHandler: OptionsHandlerType
  ): void {
    emblaApi = emblaApiInstance

    const { mergeOptions, optionsAtMedia } = optionsHandler
    const optionsBase = mergeOptions(defaultOptions, Fade.globalOptions)
    const allOptions = mergeOptions(optionsBase, userOptions)

    destroyed = false
    options = optionsAtMedia(allOptions)
    isSsr = emblaApi.internalEngine().isSsr

    if (!pluginIsActive()) return

    const selectedSnap = emblaApi.selectedSnap()
    const { scrollBody, containerRect, axis } = emblaApi.internalEngine()
    const containerSize = axis.getSize(containerRect)

    fadeToNextDistance = clampNumber(containerSize * 0.75, 200, 500)
    shouldFadePair = false

    opacities = emblaApi
      .snapList()
      .map((_, index) => (index === selectedSnap ? fullOpacity : noOpacity))

    defaultSettledBehaviour = scrollBody.settled
    defaultProgressBehaviour = emblaApi.scrollProgress

    scrollBody.settled = fadeSettled
    emblaApi.scrollProgress = fadeScrollProgress

    emblaApi
      .on('select', select)
      .on('slidefocus', fadeToSelectedSnapInstantly)
      .on('pointerdown', pointerDown)
      .on('pointerup', pointerUp)

    disableScroll()
    fadeToSelectedSnapInstantly()
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    const { scrollBody } = emblaApi.internalEngine()
    scrollBody.settled = defaultSettledBehaviour
    emblaApi.scrollProgress = defaultProgressBehaviour

    emblaApi
      .off('select', select)
      .off('slidefocus', fadeToSelectedSnapInstantly)
      .off('pointerdown', pointerDown)
      .off('pointerup', pointerUp)

    emblaApi.slideNodes().forEach((slideNode) => {
      const slideStyle = slideNode.style
      slideStyle.opacity = ''
      slideStyle.pointerEvents = ''
    })

    destroyed = true
  }

  function fadeToSelectedSnapInstantly(): void {
    const selectedSnap = emblaApi.selectedSnap()
    setOpacities(selectedSnap, fullOpacity)
  }

  function fadeScrollProgress(): number {
    return progress
  }

  function pointerUp(): void {
    shouldFadePair = false
  }

  function pointerDown(): void {
    shouldFadePair = false
    distanceFromPointerDown = 0
    fadeVelocity = 0
  }

  function select(): void {
    const duration = emblaApi.internalEngine().scrollBody.duration()
    fadeVelocity = duration ? 0 : fullOpacity
    shouldFadePair = true
    if (!duration) fadeToSelectedSnapInstantly()
  }

  function getSlideTransform(position: number): string {
    const { axis } = emblaApi.internalEngine()
    const translateAxis = axis.scroll.toUpperCase()
    return `translate${translateAxis}(${axis.direction(position)}px)`
  }

  function disableScroll(): void {
    const { translate, slideTranslates } = emblaApi.internalEngine()
    const translates = [translate, ...slideTranslates]

    translates.forEach((translate) => {
      translate.clear()
      translate.toggleActive(false)
    })

    emblaApi.containerNode().style.transform = 'translate(0px,0px)'
  }

  function lockExcessiveScroll(fadeIndex: number | null): void {
    const { scrollSnaps, location, target } = emblaApi.internalEngine()
    if (!isNumber(fadeIndex) || opacities[fadeIndex] < 0.5) return

    location.set(scrollSnaps[fadeIndex])
    target.set(location)
  }

  function setOpacities(fadeIndex: number, velocity: number): void {
    const scrollSnaps = emblaApi.snapList()

    scrollSnaps.forEach((_, indexA) => {
      const absVelocity = Math.abs(velocity)
      const currentOpacity = opacities[indexA]
      const isFadeIndex = indexA === fadeIndex

      const nextOpacity = isFadeIndex
        ? currentOpacity + absVelocity
        : currentOpacity - absVelocity

      const clampedOpacity = clampNumber(nextOpacity, noOpacity, fullOpacity)
      opacities[indexA] = clampedOpacity

      const fadePair = isFadeIndex && shouldFadePair
      const indexB = emblaApi.previousSnap()

      if (fadePair) opacities[indexB] = 1 - clampedOpacity
      if (isFadeIndex) setProgress(fadeIndex, clampedOpacity)

      setOpacity(indexA)
    })
  }

  function setOpacity(index: number): void {
    const { scrollSnaps, containerRect, scrollSnapList } =
      emblaApi.internalEngine()
    const slidesInSnap = scrollSnapList.slideGroupBySnap[index]
    const opacity = opacities[index]

    slidesInSnap.forEach((slideIndex) => {
      const slideStyle = emblaApi.slideNodes()[slideIndex].style
      const roundedOpacity = parseFloat(opacity.toFixed(2))
      const hasOpacity = roundedOpacity > noOpacity
      const position = hasOpacity ? scrollSnaps[index] : containerRect.width + 2
      const transform = getSlideTransform(position)

      if (hasOpacity) slideStyle.transform = transform

      slideStyle.opacity = roundedOpacity.toString()
      slideStyle.pointerEvents = opacity > 0.5 ? 'auto' : 'none'

      if (!hasOpacity) slideStyle.transform = transform
    })
  }

  function setProgress(fadeIndex: number, opacity: number): void {
    const { indexCurrent, dragHandler, scrollSnaps } = emblaApi.internalEngine()
    const pointerDown = dragHandler.pointerDown()
    const snapFraction = 1 / (scrollSnaps.length - 1)

    let indexA = fadeIndex
    let indexB = pointerDown ? emblaApi.selectedSnap() : emblaApi.previousSnap()

    if (pointerDown && indexA === indexB) {
      const reverseSign = Math.sign(distanceFromPointerDown) * -1
      indexA = indexB
      indexB = indexCurrent.clone().set(indexB).add(reverseSign).get()
    }

    const currentPosition = indexB * snapFraction
    const diffPosition = (indexA - indexB) * snapFraction
    progress = currentPosition + diffPosition * opacity
  }

  function getFadeIndex(): number | null {
    const { dragHandler, indexCurrent, scrollBody } = emblaApi.internalEngine()
    const selectedSnap = emblaApi.selectedSnap()

    if (!dragHandler.pointerDown()) return selectedSnap

    const directionSign = Math.sign(scrollBody.velocity())
    const distanceSign = Math.sign(distanceFromPointerDown)
    const nextSnap = indexCurrent
      .clone()
      .set(selectedSnap)
      .add(directionSign * -1)
      .get()

    if (!directionSign || !distanceSign) return null
    return distanceSign === directionSign ? nextSnap : selectedSnap
  }

  function fade(emblaApi: EmblaCarouselType): void {
    const { dragHandler, scrollBody } = emblaApi.internalEngine()
    const pointerDown = dragHandler.pointerDown()
    const velocity = scrollBody.velocity()
    const duration = scrollBody.duration()
    const fadeIndex = getFadeIndex()
    const noFadeIndex = !isNumber(fadeIndex)

    if (pointerDown) {
      if (!velocity) return

      distanceFromPointerDown += velocity
      fadeVelocity = Math.abs(velocity / fadeToNextDistance)
      lockExcessiveScroll(fadeIndex)
    }

    if (!pointerDown) {
      if (!duration || noFadeIndex) return

      fadeVelocity += (fullOpacity - opacities[fadeIndex]) / duration
      fadeVelocity *= fadeFriction
    }

    if (noFadeIndex) return
    setOpacities(fadeIndex, fadeVelocity)
  }

  function fadeSettled(): boolean {
    const { target, location } = emblaApi.internalEngine()
    const diffToTarget = target.get() - location.get()
    const notReachedTarget = Math.abs(diffToTarget) >= 1
    const fadeIndex = getFadeIndex()
    const noFadeIndex = !isNumber(fadeIndex)

    fade(emblaApi)

    if (noFadeIndex || notReachedTarget) return false
    return opacities[fadeIndex] > 0.999
  }

  function createFadeSsrStyles(
    options: FadeOptionsType,
    containerSelector: string,
    slidesSelector: string
  ): string {
    const { active } = options
    const { slideGroupBySnap } = emblaApi.internalEngine().scrollSnapList
    const selectedSnap = emblaApi.selectedSnap()
    const opacity = active ? 0 : 1
    const pointerEvents = active ? 'none' : 'auto'
    const baseStyles = `${containerSelector} ${slidesSelector}{opacity:${opacity};pointer-events:${pointerEvents};}`
    const slideStyles = slideGroupBySnap[selectedSnap].reduce((acc, index) => {
      return (
        acc +
        `${containerSelector} ${slidesSelector}:nth-child(${
          index + 1
        }){opacity:1;pointer-events:auto;}`
      )
    }, '')

    if (active) return baseStyles + slideStyles
    return baseStyles
  }

  function ssrStyles(
    containerSelector: string,
    slidesSelector: string = '> *'
  ): string {
    if (!isSsr) return ''

    const optionBreakpoints = userOptions.breakpoints || {}
    const baseStyles = createFadeSsrStyles(
      options,
      containerSelector,
      slidesSelector
    )
    const mediaStyles = Object.keys(optionBreakpoints).reduce((acc, key) => {
      return (
        acc +
        `@media ${key}{${createFadeSsrStyles(
          optionBreakpoints[key],
          containerSelector,
          slidesSelector
        )}}`
      )
    }, '')

    return baseStyles + mediaStyles
  }

  const self: FadeType = {
    name: 'fade',
    options: userOptions,
    init,
    destroy,
    ssrStyles
  }
  return self
}

declare namespace Fade {
  let globalOptions: FadeOptionsType | undefined
}

Fade.globalOptions = undefined

export default Fade
