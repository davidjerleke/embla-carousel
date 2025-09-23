import {
  EmblaCarouselType,
  EmblaEventListType,
  EmblaEventModelType
} from 'embla-carousel'

export const setupLazyLoadImage = <EventType extends keyof EmblaEventListType>(
  emblaApi: EmblaCarouselType
): ((
  emblaApi: EmblaCarouselType,
  event?: EmblaEventModelType<EventType>
) => void) => {
  const imagesInView: number[] = []
  const slideNodes = emblaApi.slideNodes()
  const spinnerNodes = slideNodes.map(
    (slideNode) =>
      <HTMLElement>slideNode.querySelector('.embla__lazy-load__spinner')
  )
  const imageNodes = slideNodes.map(
    (slideNode) =>
      <HTMLImageElement>slideNode.querySelector('.embla__lazy-load__img')
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
      .slidesInView()
      .filter((index) => !imagesInView.includes(index))
      .forEach(loadImageInView)
    return imagesInView.length === imageNodes.length
  }

  const loadImagesInViewAndDestroyIfDone = <
    EventType extends keyof EmblaEventListType
  >(
    emblaApi: EmblaCarouselType,
    event?: EmblaEventModelType<EventType>
  ): void => {
    const hasLoadedAll = loadImagesInView()

    if (hasLoadedAll && event) {
      emblaApi.off(event.type, loadImagesInViewAndDestroyIfDone)
    }
  }

  return loadImagesInViewAndDestroyIfDone
}
