import EmblaCarousel from '../components/EmblaCarousel'

const CONTAINER_SELECTOR = '.embla__container'
const SLIDE_SELECTOR = '.embla__slide'

const createSlideSizes = (count: number, size: number): number[] => {
  return Array.from(Array(count).keys()).map(() => size)
}

const removeWhitespace = (styles: string): string => {
  return styles.replace(/\s/g, '')
}

describe('➡️  SSR - Vertical', () => {
  describe(`When the slide selector parameter:`, () => {
    test('Is omitted, it selectes all immediate children', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        loop: true,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-125%,0px);
            }

            ${CONTAINER_SELECTOR} > *:nth-child(1) {
                transform: translate3d(0px,400%,0px);
            }
        `)
      )
    })

    test('Is provided, it uses the provided selector', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        loop: true,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const ssrStyles = removeWhitespace(
        emblaApi.ssrStyles(CONTAINER_SELECTOR, SLIDE_SELECTOR)
      )

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-125%,0px);
            }

            ${CONTAINER_SELECTOR} ${SLIDE_SELECTOR}:nth-child(1) {
                transform: translate3d(0px,400%,0px);
            }
        `)
      )
    })
  })

  describe('When CONTAINSCROLL:TRIMSNAPS:', () => {
    test('SSR styles are correct at startSnap 0', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 0,
        containScroll: 'trimSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,0%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 1', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 1,
        containScroll: 'trimSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-25%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 2', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 2,
        containScroll: 'trimSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-55%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 3', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        containScroll: 'trimSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-85%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 4', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 4,
        containScroll: 'trimSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-115%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 5', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 5,
        containScroll: 'trimSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-140%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1],
        [2],
        [3],
        [4],
        [5],
        [6, 7]
      ])
    })
  })

  describe('When CONTAINSCROLL:KEEPSNAPS:', () => {
    test('SSR styles are correct at startSnap 0', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 0,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,0%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 1', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 1,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,0%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 2', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 2,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-25%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 3', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-55%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 4', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 4,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-85%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 5', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 5,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-115%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 6', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 6,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-140%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })

    test('SSR styles are correct at startSnap 7', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 7,
        containScroll: 'keepSnaps',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-140%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0],
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7]
      ])
    })
  })

  describe('When CONTAINSCROLL:FALSE:', () => {
    test('SSR styles are correct at startSnap 0', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 0,
        containScroll: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,25%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 1', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 1,
        containScroll: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-25%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 2', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 2,
        containScroll: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-75%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 3', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        containScroll: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-125%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })
  })

  describe('When SLIDESTOSCROLL:AUTO:', () => {
    test('SSR styles are correct at startSnap 0', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 0,
        slidesToScroll: 'auto',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,0%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 1', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 1,
        slidesToScroll: 'auto',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-85%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7]
      ])
    })

    test('SSR styles are correct at startSnap 2', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 2,
        slidesToScroll: 'auto',
        axis: 'y',
        ssr: createSlideSizes(8, 30)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-140%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7]
      ])
    })
  })

  describe('When LOOP:TRUE:', () => {
    test('SSR styles are correct at startSnap 0', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 0,
        loop: true,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,25%,0px);
            }

            ${CONTAINER_SELECTOR} > *:nth-child(4) {
                transform: translate3d(0px,-400%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 1', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 1,
        loop: true,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-25%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 2', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 2,
        loop: true,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-75%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 3', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        loop: true,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-125%,0px);
            }

            ${CONTAINER_SELECTOR} > *:nth-child(1) {
                transform: translate3d(0px,400%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })
  })

  describe('When LOOP:FALSE:', () => {
    test('SSR styles are correct at startSnap 0', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 0,
        loop: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,0%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 1', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 1,
        loop: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-25%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 2', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 2,
        loop: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-75%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })

    test('SSR styles are correct at startSnap 3', () => {
      const emblaApi = EmblaCarousel(null, {
        startSnap: 3,
        loop: false,
        axis: 'y',
        ssr: createSlideSizes(4, 50)
      })

      const { scrollSnapList } = emblaApi.internalEngine()
      const ssrStyles = removeWhitespace(emblaApi.ssrStyles(CONTAINER_SELECTOR))

      expect(ssrStyles).toBe(
        removeWhitespace(`
            ${CONTAINER_SELECTOR} {
                transform: translate3d(0px,-100%,0px);
            }
        `)
      )

      expect(scrollSnapList.slidesBySnap).toEqual([[0], [1], [2], [3]])
    })
  })
})
