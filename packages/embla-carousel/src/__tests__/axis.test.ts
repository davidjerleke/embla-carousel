import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import {
  FIXTURE_AXIS_X_LTR,
  FIXTURE_AXIS_X_RTL,
  FIXTURE_AXIS_Y
} from './fixtures/axis.fixture'

describe('➡️  Axis - Horizontal', () => {
  describe('Translates correctly when direction is:', () => {
    test('LTR', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_X_LTR), {
        containScroll: false
      })

      expect(emblaApi.containerNode().style.transform).toBe(
        'translate3d(100px,0px,0px)'
      )
    })

    test('RTL', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_X_RTL), {
        containScroll: false,
        direction: 'rtl'
      })

      expect(emblaApi.containerNode().style.transform).toBe(
        'translate3d(-100px,0px,0px)'
      )
    })
  })
})

describe('➡️  Axis - Vertical', () => {
  describe('Translates correctly when direction is:', () => {
    test('Vertical', () => {
      const emblaApi = EmblaCarousel(mockTestElements(FIXTURE_AXIS_Y), {
        containScroll: false,
        axis: 'y'
      })

      expect(emblaApi.containerNode().style.transform).toBe(
        'translate3d(0px,100px,0px)'
      )
    })
  })
})
