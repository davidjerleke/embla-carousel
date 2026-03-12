import { EmblaCarouselType } from '@vendor/embla-carousel-v8/embla-carousel'

const addTogglePrevNextButtonsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  const togglePrevNextButtonsState = (): void => {
    if (emblaApi.canScrollPrev()) {
      prevBtn.classList.remove('embla__button--disabled')
    } else {
      prevBtn.classList.add('embla__button--disabled')
    }

    if (emblaApi.canScrollNext()) {
      nextBtn.classList.remove('embla__button--disabled')
    } else {
      nextBtn.classList.add('embla__button--disabled')
    }
  }

  togglePrevNextButtonsState()

  emblaApi
    .on('select', togglePrevNextButtonsState)
    .on('reInit', togglePrevNextButtonsState)
}

export const addPrevNextButtonClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement
): void => {
  const scrollPrev = (): void => {
    emblaApi.scrollPrev()
  }
  const scrollNext = (): void => {
    emblaApi.scrollNext()
  }
  prevBtn.addEventListener('click', scrollPrev, false)
  nextBtn.addEventListener('click', scrollNext, false)

  addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn)
}
