import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_AXIS_X_RTL } from './fixtures/axis-rtl.fixture'

describe('➡️  Axis - Horizontal RTL', () => {
  test('Translates correctly', () => {
    const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_X_RTL), {
      containScroll: false,
      direction: 'rtl'
    })

    expect(emblaApi.containerNode().style.transform).toBe(
      'translate3d(-100px,0px,0px)'
    )
  })
})
