import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'

export const setupLazyLoadImage = (
  emblaApi: EmblaCarouselType,
): ((emblaApi: EmblaCarouselType, eventName: EmblaEventType) => void) => {
  const imagesInView: number[] = []
  const slideNodes = emblaApi.slideNodes()
  const spinnerNodes = slideNodes.map(
    (slideNode) =>
      <HTMLElement>slideNode.querySelector('.embla__lazy-load__spinner'),
  )
  const imageNodes = slideNodes.map(
    (slideNode) =>
      <HTMLImageElement>slideNode.querySelector('.embla__lazy-load__img'),
  )

  const loadImageInView = (index: number): void => {
    const imageNode = imageNodes[index]
    const slideNode = slideNodes[index]
    const spinnerNode = spinnerNodes[index]
    const src = <string>imageNode.getAttribute('data-src')

    imageNode.src = src
    imagesInView.push(index)

    const onLoad = (): void => {
      slideNode.classList.add('embla__lazy-load--has-loaded')
      spinnerNode.parentElement?.removeChild(spinnerNode)
      imageNode.removeEventListener('load', onLoad)
    }
    imageNode.addEventListener('load', onLoad)
  }

  const loadImagesInView = (): boolean => {
    emblaApi
      .slidesInView(true)
      .filter((index) => !imagesInView.includes(index))
      .forEach(loadImageInView)
    return imagesInView.length === imageNodes.length
  }

  const loadImagesInViewAndDestroyIfDone = (
    emblaApi: EmblaCarouselType,
    eventName: EmblaEventType,
  ): void => {
    const loadedAll = loadImagesInView()
    if (loadedAll) emblaApi.off(eventName, loadImagesInViewAndDestroyIfDone)
  }

  return loadImagesInViewAndDestroyIfDone
}
