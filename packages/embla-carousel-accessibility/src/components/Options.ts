import { CreateOptionsType } from 'embla-carousel'

export type RootNodeType =
  | null
  | ((emblaRoot: HTMLElement) => HTMLElement | null)

export type AriaTextCallbackType = (
  hasAnyGroupedSlides: boolean,
  firstSlideIndex: number,
  lastSlideIndex: number,
  totalSlides: number,
  selectedSnapIndex: number,
  totalSnaps: number
) => string

export type OptionsType = CreateOptionsType<{
  announceChanges: boolean
  carouselId: string
  carouselRole: string
  carouselAriaLabel: string
  previousButtonAriaLabel: string
  nextButtonAriaLabel: string
  carouselAriaRoleDescription: string
  slideAriaRoleDescription: string
  slideRole: string
  rootNode: RootNodeType
  slideAriaLabel: AriaTextCallbackType
  dotButtonAriaLabel: AriaTextCallbackType
  liveRegionContent: AriaTextCallbackType
}>

export const defaultOptions: OptionsType = {
  active: true,
  breakpoints: {},
  announceChanges: false,
  carouselId: '',
  carouselRole: 'region',
  carouselAriaLabel: 'Carousel',
  previousButtonAriaLabel: 'Go to previous Slide',
  nextButtonAriaLabel: 'Go to next Slide',
  carouselAriaRoleDescription: 'carousel',
  slideAriaRoleDescription: 'slide',
  slideRole: 'group',
  rootNode: null,
  slideAriaLabel: (
    hasAnyGroupedSlides,
    firstSlideIndex,
    lastSlideIndex,
    totalSlides,
    selectedSnapIndex,
    totalSnaps
  ) => {
    const slide = firstSlideIndex + 1
    const lastSlide = lastSlideIndex + 1
    const isGrouped = firstSlideIndex !== lastSlideIndex
    const groupInfo = `(group ${selectedSnapIndex + 1} of ${totalSnaps})`

    if (!hasAnyGroupedSlides) {
      return `Slide ${slide} of ${totalSlides}`
    }
    if (!isGrouped) {
      return `Slide ${slide} of ${totalSlides} ${groupInfo}`
    }

    return `Slides ${slide}-${lastSlide} of ${totalSlides} ${groupInfo}`
  },
  dotButtonAriaLabel: (
    hasAnyGroupedSlides,
    firstSlideIndex,
    lastSlideIndex,
    totalSlides,
    selectedSnapIndex,
    totalSnaps
  ) => {
    const slide = firstSlideIndex + 1
    const lastSlide = lastSlideIndex + 1
    const isSlideGrouped = firstSlideIndex !== lastSlideIndex
    const groupInfo = `(group ${selectedSnapIndex + 1} of ${totalSnaps})`

    if (!hasAnyGroupedSlides) {
      return `Go to slide ${slide} of ${totalSlides}`
    }
    if (!isSlideGrouped) {
      return `Go to slide ${slide} of ${totalSlides} ${groupInfo}`
    }

    return `Go to slides ${slide}-${lastSlide} of ${totalSlides} ${groupInfo}`
  },
  liveRegionContent: (
    hasAnyGroupedSlides,
    firstSlideIndex,
    lastSlideIndex,
    totalSlides,
    selectedSnapIndex,
    totalSnaps
  ) => {
    const slide = firstSlideIndex + 1
    const lastSlide = lastSlideIndex + 1
    const isSlideGrouped = firstSlideIndex !== lastSlideIndex
    const groupInfo = `(group ${selectedSnapIndex + 1} of ${totalSnaps})`

    if (!hasAnyGroupedSlides) {
      return `Showing slide ${slide} of ${totalSlides}`
    }
    if (!isSlideGrouped) {
      return `Showing slide ${slide} of ${totalSlides} ${groupInfo}`
    }

    return `Showing slides ${slide}-${lastSlide} of ${totalSlides} ${groupInfo}`
  }
}
