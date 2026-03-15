import useEmblaCarousel from 'embla-carousel-solid'

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel(() => ({
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { align: 'start' }
    }
  }))
}
