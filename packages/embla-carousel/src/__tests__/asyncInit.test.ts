import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_CONSTRUCTOR_1 } from './fixtures/constructor.fixture'

describe('➡️  asyncInit option', () => {
  test('Creates engine with sync init by default', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONSTRUCTOR_1),
      { containScroll: false }
    )
    const engine = emblaApi.internalEngine()
    expect(engine.scrollSnaps.length).toBeGreaterThan(0)
    emblaApi.destroy()
  })

  test('Accepts asyncInit option without error', () => {
    const emblaApi = EmblaCarousel(
      mockTestElements(FIXTURE_CONSTRUCTOR_1),
      { containScroll: false, asyncInit: false }
    )
    const engine = emblaApi.internalEngine()
    expect(engine.scrollSnaps.length).toBeGreaterThan(0)
    emblaApi.destroy()
  })
})
