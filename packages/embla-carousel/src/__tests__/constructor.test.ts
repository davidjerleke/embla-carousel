import EmblaCarousel from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import {
  FIXTURE_CONSTRUCTOR_1,
  FIXTURE_CONSTRUCTOR_2
} from './fixtures/constructor.fixture'

describe('➡️  EmblaCarousel', () => {
  describe('Does NOT TRHOW when initialized and', () => {
    test('All necessary nodes are provided', () => {
      expect(() =>
        EmblaCarousel(mockTestElements(FIXTURE_CONSTRUCTOR_1))
      ).not.toThrow()
    })

    test('The slide nodes are omitted', () => {
      expect(() =>
        EmblaCarousel(mockTestElements(FIXTURE_CONSTRUCTOR_2))
      ).not.toThrow()
    })
  })

  describe('Does TRHOW when initialized and', () => {
    test('The root node parameter is omitted', () => {
      expect(() => EmblaCarousel(undefined as any)).toThrow()
    })

    test('The container node is omitted', () => {
      expect(() =>
        EmblaCarousel(
          mockTestElements({
            slideOffsets: [],
            endMargin: {
              property: 'marginRight',
              value: 0
            }
          })
        )
      ).toThrow()
    })
  })
})
