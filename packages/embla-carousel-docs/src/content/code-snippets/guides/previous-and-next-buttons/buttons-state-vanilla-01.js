import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const prevButtonNode = wrapperNode.querySelector('.embla__prev')
const nextButtonNode = wrapperNode.querySelector('.embla__next')

const emblaApi = EmblaCarousel(viewportNode, { loop: false })

prevButtonNode.addEventListener('click', () => emblaApi.scrollToPrev(), false)
nextButtonNode.addEventListener('click', () => emblaApi.scrollToNext(), false)

function toggleButtonsDisabled(emblaApi) {
  const setButtonState = (button, enabled) => {
    button.toggleAttribute('disabled', !enabled)
  }
  setButtonState(prevButtonNode, emblaApi.canScrollToPrev())
  setButtonState(nextButtonNode, emblaApi.canScrollToNext())
}

toggleButtonsDisabled(emblaApi)
emblaApi.on('select', toggleButtonsDisabled)
emblaApi.on('reinit', toggleButtonsDisabled)
