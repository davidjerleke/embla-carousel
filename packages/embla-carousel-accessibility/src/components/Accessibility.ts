import { AriaTextCallbackType, defaultOptions, OptionsType } from './Options'
import { AttributeHandler, AttributeHandlerType } from './AttributeHandler'
import {
  ChildNodeSubjectType,
  FocusNodesBySlideType,
  getAccessibilityRootNode,
  getChildNode,
  getChildNodes
} from './utils'
import {
  CreatePluginType,
  EmblaCarouselType,
  OptionsHandlerType
} from 'embla-carousel'

declare module 'embla-carousel' {
  interface EmblaPluginsType {
    accessibility: AccessibilityType
  }
}

// https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/
// https://www.smashingmagazine.com/2023/02/guide-building-accessible-carousels/
// https://dev.to/jasonwebb/how-to-build-a-more-accessible-carousel-or-slider-35lp
// https://heydonworks.com/article/aria-controls-is-poop/
export type AccessibilityType = CreatePluginType<
  {
    setupPrevAndNextButtons: (
      prevButton: ChildNodeSubjectType,
      nextButton: ChildNodeSubjectType
    ) => void
    setupDotButtons: (dotsWrapper: ChildNodeSubjectType) => void
    setupLiveRegion: (liveRegion: ChildNodeSubjectType) => void
    setUpdateLiveRegion: (enable: boolean) => void
    updateSlides: (snaps?: number[]) => void
    updateDotButtons: (snaps?: number[]) => void
    updatePrevAndNextButtons: () => void
    updateLiveRegion: () => void
  },
  OptionsType
>

export type AccessibilityOptionsType = AccessibilityType['options']

function Accessibility(
  userOptions: AccessibilityOptionsType = {}
): AccessibilityType {
  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([type="hidden"]):not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'summary',
    'details',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable]:not([contenteditable="false"])'
  ]
  const focusSelector = focusableSelectors
    .map((selector) => `${selector}:not([hidden])`)
    .join(',')

  let options: OptionsType
  let emblaApi: EmblaCarouselType
  let isSsr = false
  let destroyed = false
  let rootNode: HTMLElement
  let liveRegionNode: Element | null = null
  let dotsObserver: MutationObserver | null = null
  let allSnaps: number[] = []
  let isUpdatingLiveRegion = false
  let lastFocusedSlide: null | number = null
  let focusNodesBySlide: FocusNodesBySlideType[] = []

  let rootAttributes: AttributeHandlerType
  let prevButtonAttributes: AttributeHandlerType
  let nextButtonAttributes: AttributeHandlerType
  let liveRegionAttributes: AttributeHandlerType
  let dotsAttributes: AttributeHandlerType[] = []
  let slidesAttributes: AttributeHandlerType[] = []

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
    const optionsBase = mergeOptions(
      defaultOptions,
      Accessibility.globalOptions
    )
    const allOptions = mergeOptions(optionsBase, userOptions)

    destroyed = false
    options = optionsAtMedia(allOptions)
    isSsr = emblaApi.internalEngine().isSsr

    if (!pluginIsActive()) return

    rootAttributes = AttributeHandler()
    prevButtonAttributes = AttributeHandler()
    nextButtonAttributes = AttributeHandler()
    liveRegionAttributes = AttributeHandler()
    dotsAttributes = emblaApi.snapList().map(() => AttributeHandler())
    slidesAttributes = emblaApi.slideNodes().map(() => AttributeHandler())

    rootNode = getAccessibilityRootNode(emblaApi, options.rootNode)
    allSnaps = emblaApi.snapList().map((_, index) => index)
    focusNodesBySlide = emblaApi.slideNodes().map(() => [])
    isUpdatingLiveRegion = options.announceChanges

    setupCarousel()
    setupSlides()

    emblaApi.on('select', onSelect)
  }

  function destroy(): void {
    if (!pluginIsActive()) return

    emblaApi.off('select', onSelect)

    rootAttributes.removeAll()
    prevButtonAttributes.removeAll()
    nextButtonAttributes.removeAll()
    liveRegionAttributes.removeAll()
    slidesAttributes.forEach((slideAttributes) => slideAttributes.removeAll())
    dotsAttributes.forEach((dotAttributes) => dotAttributes.removeAll())
    focusNodesBySlide.flat().forEach((slideFocusNode) => {
      const { focusAttributes, prevTabIndex } = slideFocusNode
      focusAttributes.toggle('tabindex', prevTabIndex)
    })
  }

  function setupCarousel(): void {
    if (!pluginIsActive()) return

    const { carouselRole, carouselAriaLabel, carouselAriaRoleDescription } =
      options

    if (dotsObserver) dotsObserver.disconnect()
    rootAttributes.connect(emblaApi.rootNode())
    rootAttributes.set('role', carouselRole)
    rootAttributes.set('aria-label', carouselAriaLabel)
    rootAttributes.set('aria-roledescription', carouselAriaRoleDescription)
  }

  function onSlideFocusIn(slideIndex: number): () => void {
    return () => {
      lastFocusedSlide = slideIndex
      const { snapBySlide } = emblaApi.internalEngine().scrollSnapList
      const snapIndex = snapBySlide[lastFocusedSlide]
      updateSlides([snapIndex])
    }
  }

  function onSlideFocusOut(): void {
    if (lastFocusedSlide === null || lastFocusedSlide < 0) return
    const { snapBySlide } = emblaApi.internalEngine().scrollSnapList
    const snapIndex = snapBySlide[lastFocusedSlide]
    updateSlides([snapIndex])
    lastFocusedSlide = null
  }

  function setupSlides(): void {
    if (!pluginIsActive()) return

    const { scrollSnapList, eventStore } = emblaApi.internalEngine()
    const { slideRole, slideAriaRoleDescription, slideAriaLabel } = options
    const focusOptions = { capture: true }

    emblaApi.slideNodes().forEach((slideNode, slideIndex) => {
      const snapIndex = scrollSnapList.snapBySlide[slideIndex]
      const label = getAriaText(snapIndex, slideAriaLabel)
      const slideAttributes = slidesAttributes[slideIndex]
      const slideFocusNodes = getChildNodes(slideNode, focusSelector)

      slideAttributes.connect(slideNode)
      slideAttributes.set('role', slideRole)
      slideAttributes.set('aria-roledescription', slideAriaRoleDescription)
      slideAttributes.set('aria-label', label)

      eventStore.add(slideNode, 'focusout', onSlideFocusOut, focusOptions)
      eventStore.add(
        slideNode,
        'focusin',
        onSlideFocusIn(slideIndex),
        focusOptions
      )

      focusNodesBySlide[slideIndex] = slideFocusNodes.map((focusNode) => ({
        focusAttributes: AttributeHandler(focusNode),
        prevTabIndex: focusNode.getAttribute('tabindex')
      }))
    })

    updateSlides()
  }

  function setupDotButtons(dotsWrapper: ChildNodeSubjectType): void {
    if (!pluginIsActive()) return

    const { dotButtonAriaLabel } = options

    const wrapper = getChildNode(rootNode, dotsWrapper)
    const dotNodes = getChildNodes(wrapper, wrapper?.children)
    dotsAttributes = dotNodes.map(() => AttributeHandler())

    dotNodes.forEach((dotNode, snapIndex) => {
      const label = getAriaText(snapIndex, dotButtonAriaLabel)
      const dotAttributes = dotsAttributes[snapIndex]

      dotAttributes.connect(dotNode)
      dotAttributes.set('aria-label', label)
    })

    if (wrapper) {
      if (dotsObserver) dotsObserver.disconnect()
      dotsObserver = new MutationObserver(() => setupDotButtons(dotsWrapper))
      dotsObserver.observe(wrapper, { childList: true })
    }

    updateDotButtons()
  }

  function setupPrevAndNextButtons(
    prevButton: ChildNodeSubjectType,
    nextButton: ChildNodeSubjectType
  ): void {
    if (!pluginIsActive()) return

    const { previousButtonAriaLabel, nextButtonAriaLabel } = options

    prevButtonAttributes.connect(getChildNode(rootNode, prevButton))
    prevButtonAttributes.set('aria-label', previousButtonAriaLabel)

    nextButtonAttributes.connect(getChildNode(rootNode, nextButton))
    nextButtonAttributes.set('aria-label', nextButtonAriaLabel)

    updatePrevAndNextButtons()
  }

  function setupLiveRegion(liveRegion: ChildNodeSubjectType): void {
    if (!pluginIsActive()) return

    liveRegionNode = getChildNode(rootNode, liveRegion)
    liveRegionAttributes.connect(liveRegionNode)
    liveRegionAttributes.set('aria-live', 'polite')
    liveRegionAttributes.set('aria-atomic', 'true')
    updateLiveRegion()
  }

  function onSelect(emblaApi: EmblaCarouselType): void {
    const previousSnap = emblaApi.previousSnap()
    const selectedSnap = emblaApi.selectedSnap()
    const snapsToUpdate = [selectedSnap]
    if (selectedSnap !== previousSnap) snapsToUpdate.push(previousSnap)

    updateSlides(snapsToUpdate)
    updateDotButtons(snapsToUpdate)
    updatePrevAndNextButtons()
    updateLiveRegion()
  }

  function setUpdateLiveRegion(enable: boolean): void {
    isUpdatingLiveRegion = enable
    updateLiveRegion()
  }

  function updateLiveRegion(): void {
    if (!pluginIsActive()) return
    if (!liveRegionNode) return
    if (!isUpdatingLiveRegion) return
    if (!options.liveRegionContent) return

    const snapIndex = emblaApi.selectedSnap()
    const label = getAriaText(snapIndex, options.liveRegionContent)
    if (label) liveRegionNode.innerHTML = label
  }

  function updatePrevAndNextButtons(): void {
    const isPrevDisabled = !emblaApi.canScrollToPrev()
    const isNextDisabled = !emblaApi.canScrollToNext()

    prevButtonAttributes.toggle('aria-disabled', isPrevDisabled)
    nextButtonAttributes.toggle('aria-disabled', isNextDisabled)
  }

  function updateDotButtons(snaps: number[] = allSnaps): void {
    snaps.forEach((snapIndex) => {
      const isActive = snapIndex === emblaApi.selectedSnap()
      const dotAttributes = dotsAttributes[snapIndex]

      if (!dotAttributes) return
      dotAttributes.toggle('aria-current', isActive)
    })
  }

  function updateSlides(snaps: number[] = allSnaps): void {
    const { slidesBySnap } = emblaApi.internalEngine().scrollSnapList

    snaps.forEach((snapIndex) => {
      const slidesInSnap = slidesBySnap[snapIndex]
      const isActive = snapIndex === emblaApi.selectedSnap()

      slidesInSnap.forEach((slideIndex) => {
        const slideNode = emblaApi.slideNodes()[slideIndex]
        const hasFocusedElement = slideNode.contains(document.activeElement)
        const slideAttributes = slidesAttributes[slideIndex]
        const slideFocusNodes = focusNodesBySlide[slideIndex]

        slideAttributes.toggle('aria-hidden', !isActive && !hasFocusedElement)

        slideFocusNodes.forEach((slideFocusNode) => {
          const { focusAttributes, prevTabIndex } = slideFocusNode
          const tabindex = !isActive ? '-1' : prevTabIndex
          focusAttributes.toggle('tabindex', tabindex)
        })
      })
    })
  }

  function getAriaText(
    snapIndex: number,
    ariaTextCallback: AriaTextCallbackType
  ): string {
    const { slidesBySnap } = emblaApi.internalEngine().scrollSnapList
    const slidesInSnap = slidesBySnap[snapIndex]

    if (!ariaTextCallback) return ''
    if (!allSnaps.length) return ''
    if (!slidesInSnap) return ''

    const hasSlideGroups = slidesBySnap.some((group) => group.length > 1)
    const slideCount = emblaApi.slideNodes().length
    const snapCount = allSnaps.length

    return ariaTextCallback(
      hasSlideGroups,
      slidesInSnap[0],
      slidesInSnap[slidesInSnap.length - 1],
      slideCount,
      snapIndex,
      snapCount
    )
  }

  const self: AccessibilityType = {
    name: 'accessibility',
    options: userOptions,
    init,
    destroy,
    setupPrevAndNextButtons,
    setupDotButtons,
    setupLiveRegion,
    setUpdateLiveRegion,
    updateSlides,
    updateDotButtons,
    updatePrevAndNextButtons,
    updateLiveRegion
  }
  return self
}

declare namespace Accessibility {
  let globalOptions: AccessibilityOptionsType | undefined
}

Accessibility.globalOptions = undefined

export default Accessibility
