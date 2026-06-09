import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const prevButtonNode = wrapperNode.querySelector('.embla__prev')
const nextButtonNode = wrapperNode.querySelector('.embla__next')

const emblaApi = EmblaCarousel(viewportNode, { loop: false })

prevButtonNode.addEventListener('click', () => emblaApi.goToPrev(), false)
nextButtonNode.addEventListener('click', () => emblaApi.goToNext(), false)

const toggleButtonsDisabled = (emblaApi) => {
  const setButtonState = (button, enabled) => {
    button.toggleAttribute('disabled', !enabled)
  }
  setButtonState(prevButtonNode, emblaApi.canGoToPrev())
  setButtonState(nextButtonNode, emblaApi.canGoToNext())
}

toggleButtonsDisabled(emblaApi)
emblaApi.on('select', toggleButtonsDisabled)
emblaApi.on('reinit', toggleButtonsDisabled)
