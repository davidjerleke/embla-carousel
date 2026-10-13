import EmblaCarousel from 'embla-carousel'
import Ssr from '../components/Ssr'

const CONTAINER_SELECTOR = '.embla__container'

const createSlideSizes = (count: number, size: number): number[] => {
  return Array.from(Array(count).keys()).map(() => size)
}

const removeWhitespace = (styles?: string): string => {
  if (!styles) return ''
  return styles.replace(/\s/g, '')
}

describe('➡️  SSR - Offset', () => {
  describe('When OFFSET is applied to LTR:', () => {
    test('It injects a positive pixel offset via calc() on the container', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 0,
          loop: false,
          offset: 70
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(calc(0% + 70px),0px,0px);
            }
        `)
      )
    })

    test('It preserves the aligned percentage alongside the offset', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 1,
          loop: false,
          offset: 70
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(calc(-25% + 70px),0px,0px);
            }
        `)
      )
    })

    test('It emits a subtraction for a negative pixel offset', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 0,
          loop: false,
          offset: -40
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(calc(0% - 40px),0px,0px);
            }
        `)
      )
    })

    test('It shifts the container only and leaves loop clones untouched', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 0,
          loop: true,
          offset: 70
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(calc(25% + 70px),0px,0px);
            }

            ${CONTAINER_SELECTOR} > *:nth-child(4) {
                transform: translate3d(-400%,0px,0px);
            }
        `)
      )
    })
  })

  describe('When OFFSET is applied to RTL:', () => {
    test('It flips the offset sign to follow the content direction', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 1,
          loop: false,
          direction: 'rtl',
          offset: 70
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(calc(25% - 70px),0px,0px);
            }
        `)
      )
    })
  })

  describe('When OFFSET is applied to vertical:', () => {
    test('It injects the offset into the y axis', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 1,
          loop: false,
          axis: 'y',
          offset: 70
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,calc(-25% + 70px),0px);
            }
        `)
      )
    })

    test('It shifts the container only and leaves loop clones untouched', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 0,
          loop: true,
          axis: 'y',
          offset: 70
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,calc(25% + 70px),0px);
            }

            ${CONTAINER_SELECTOR} > *:nth-child(4) {
                transform: translate3d(0px,-400%,0px);
            }
        `)
      )
    })
  })

  describe('When OFFSET is zero (default):', () => {
    test('It emits a plain percentage with no calc()', () => {
      const emblaApi = EmblaCarousel(
        null,
        {
          startSnap: 0,
          loop: false,
          offset: 0
        },
        [Ssr({ slideSizes: createSlideSizes(4, 50) })]
      )

      const ssrStyles = removeWhitespace(
        emblaApi.plugins().ssr?.getStyles(CONTAINER_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0%,0px,0px);
            }
        `)
      )
    })
  })
})
