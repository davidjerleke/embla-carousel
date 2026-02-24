import EmblaCarousel from 'embla-carousel'

const wrapperNode = document.querySelector('.embla')
const viewportNode = wrapperNode.querySelector('.embla__viewport')
const dotsNode = wrapperNode.querySelector('.embla__dots')
const emblaApi = EmblaCarousel(viewportNode, { loop: false })

let dotNodes = []

const createDotButtonHtml = (emblaApi, dotsNode) => {
  const dotTemplate = document.getElementById('embla-dot-template')
  const snapList = emblaApi.snapList()
  dotsNode.innerHTML = snapList.reduce((acc) => acc + dotTemplate.innerHTML, '')
  return Array.from(dotsNode.querySelectorAll('.embla__dot'))
}

const addDotButtonClickHandlers = (emblaApi, dotNodes) => {
  dotNodes.forEach((dotNode, index) => {
    dotNode.addEventListener('click', () => emblaApi.scrollToSnap(index), false)
  })
}

const toggleDotButtonsActive = (emblaApi, dotNodes) => {
  if (!dotNodes.length) return
  const previous = emblaApi.previousSnap()
  const selected = emblaApi.selectedSnap()
  dotNodes[previous].classList.remove('embla__dot--selected')
  dotNodes[selected].classList.add('embla__dot--selected')
}

const createAndSetupDotButtons = (emblaApi, dotsNode) => {
  dotNodes = createDotButtonHtml(emblaApi, dotsNode)
  addDotButtonClickHandlers(emblaApi, dotNodes)
  toggleDotButtonsActive(emblaApi, dotNodes)
}

createAndSetupDotButtons(emblaApi, dotsNode)
emblaApi.on('reinit', () => createAndSetupDotButtons(emblaApi, dotsNode))
emblaApi.on('select', (emblaApi) => toggleDotButtonsActive(emblaApi, dotNodes))
