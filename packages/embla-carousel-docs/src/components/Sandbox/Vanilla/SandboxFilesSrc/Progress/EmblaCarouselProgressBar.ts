import { EmblaCarouselType } from 'embla-carousel'

export const setupProgressBar = (
  emblaApi: EmblaCarouselType,
  progressNode: HTMLElement
): {
  applyProgress: () => void
  removeProgress: () => void
} => {
  const applyProgress = (): void => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    progressNode.style.transform = `translate3d(${progress * 100}%,0px,0px)`
  }

  const removeProgress = (): void => {
    progressNode.removeAttribute('style')
  }

  return {
    applyProgress,
    removeProgress
  }
}
