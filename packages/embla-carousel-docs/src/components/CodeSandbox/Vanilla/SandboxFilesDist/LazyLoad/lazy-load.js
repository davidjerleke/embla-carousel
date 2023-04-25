export const setupLazyLoadImage = (emblaApi) => {
  const imagesInView = []
  const slideNodes = emblaApi.slideNodes()
  const spinnerNodes = slideNodes.map((slideNode) =>
    slideNode.querySelector('.embla__lazy-load__spinner'),
  )
  const imageNodes = slideNodes.map((slideNode) =>
    slideNode.querySelector('.embla__lazy-load__img'),
  )

  const loadImageInView = (index) => {
    const imageNode = imageNodes[index]
    const slideNode = slideNodes[index]
    const spinnerNode = spinnerNodes[index]
    const src = imageNode.getAttribute('data-src')

    imageNode.src = src
    imagesInView.push(index)

    const onLoad = () => {
      slideNode.classList.add('embla__lazy-load--has-loaded')
      spinnerNode.parentElement?.removeChild(spinnerNode)
      imageNode.removeEventListener('load', onLoad)
    }
    imageNode.addEventListener('load', onLoad)
  }

  const loadImagesInView = () => {
    emblaApi
      .slidesInView(true)
      .filter((index) => !imagesInView.includes(index))
      .forEach(loadImageInView)
    return imagesInView.length === imageNodes.length
  }

  const loadImagesInViewAndDestroyIfDone = (emblaApi, eventName) => {
    const loadedAll = loadImagesInView()
    if (loadedAll) emblaApi.off(eventName, loadImagesInViewAndDestroyIfDone)
  }

  return loadImagesInViewAndDestroyIfDone
}
