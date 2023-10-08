import EmblaCarousel from '../components/EmblaCarousel'
import {
  mockTestElements,
  resetMatchingMediaQuery,
  setMatchingMediaQuery
} from './mocks'
import { FIXTURE_BREAKPOINTS } from './fixtures/breakpoints.fixture'

const MEDIA_QUERY_EXTRA_LARGE = '(min-width: 1200px)'
const MEDIA_QUERY_EXTRA_SMALL = '(min-width: 576px)'

describe('➡️  Breakpoints', () => {
  const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_BREAKPOINTS), {
    align: 'start',
    breakpoints: {
      [MEDIA_QUERY_EXTRA_LARGE]: {
        align: 'center',
        startIndex: 1
      },
      [MEDIA_QUERY_EXTRA_SMALL]: {
        align: 'end'
      }
    }
  })

  beforeEach(() => {
    resetMatchingMediaQuery()
  })

  test('Applies options at the root level when no media query match', () => {
    emblaApi.reInit()

    const engine = emblaApi.internalEngine()
    const expectedScrollSnaps = [0, -800, -1200]

    expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
  })

  test('Applies options for a matching media query', () => {
    setMatchingMediaQuery(MEDIA_QUERY_EXTRA_LARGE)
    emblaApi.reInit()

    const engine = emblaApi.internalEngine()
    const expectedScrollSnaps = [0, -500, -800, -1150, -1200]

    expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
  })

  test('Applies options for the last matching query if multiple queries match and options are in conflict', () => {
    setMatchingMediaQuery([MEDIA_QUERY_EXTRA_LARGE, MEDIA_QUERY_EXTRA_SMALL])
    emblaApi.reInit()

    const engine = emblaApi.internalEngine()
    const expectedScrollSnaps = [0, -200, -400, -900, -1200]

    expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
  })

  test('Merges options when multiple queries match and options are not in conflict', () => {
    setMatchingMediaQuery([MEDIA_QUERY_EXTRA_LARGE, MEDIA_QUERY_EXTRA_SMALL])
    emblaApi.reInit()

    const engine = emblaApi.internalEngine()
    const expectedScrollSnaps = [0, -200, -400, -900, -1200]

    expect(engine.scrollSnaps).toEqual(expectedScrollSnaps)
    expect(engine.location.get()).toBe(
      expectedScrollSnaps[engine.options.startIndex]
    )
  })
})
