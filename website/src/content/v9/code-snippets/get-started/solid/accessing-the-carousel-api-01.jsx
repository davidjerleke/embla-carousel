import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(() => ({ loop: false }))

  const goToPrev = () => emblaApi()?.goToPrev()
  const goToNext = () => emblaApi()?.goToNext()

  return (
    <div class="embla">
      <div class="embla__viewport" ref={emblaRef}>
        <div class="embla__container">
          <div class="embla__slide">Slide 1</div>
          <div class="embla__slide">Slide 2</div>
          <div class="embla__slide">Slide 3</div>
        </div>
      </div>

      <button class="embla__prev" onClick={goToPrev}>
        Scroll to prev
      </button>
      <button class="embla__next" onClick={goToNext}>
        Scroll to next
      </button>
    </div>
  )
}
