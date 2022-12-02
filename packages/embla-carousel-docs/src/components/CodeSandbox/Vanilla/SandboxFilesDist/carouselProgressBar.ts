import { EmblaCarouselType } from 'embla-carousel'
 
export const setupProgressBar = (
  emblaApi: EmblaCarouselType,
  progressNode: HTMLElement,
): {
  applyProgress: () => void
  removeProgress: () => void
} => {
  const applyProgress = (): void => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    progressNode.style.transform = `translateX(${progress * 100}%)`
  }
 
  const removeProgress = (): void => {
    progressNode.removeAttribute('style')
  }
 
  return {
    applyProgress,
    removeProgress,
  }
}
