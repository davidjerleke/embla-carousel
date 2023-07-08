import { EmblaOptionsType } from '../components/Options'
import EmblaCarousel, { EmblaCarouselType } from '../components/EmblaCarousel'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false
  }))
})

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: () => undefined,
    unobserve: () => undefined,
    disconnect: () => undefined
  }))
})

export const initializeEmbla = (
  withContainer: boolean = true,
  withSlides: boolean = true,
  options?: EmblaOptionsType
): (() => EmblaCarouselType) => {
  const rootNode = document.createElement('div')
  const containerNode = document.createElement('div')

  if (withContainer) rootNode.appendChild(containerNode)
  if (withSlides) {
    for (let i = 0; i < 3; i += 1) {
      containerNode.appendChild(document.createElement('div'))
    }
  }
  return () => EmblaCarousel(rootNode, options)
}

describe('EmblaCarousel', () => {
  describe('When initialized it does not throw when', () => {
    test('All necessary nodes are provided', () => {
      expect(initializeEmbla()).not.toThrow()
    })

    test('The slide nodes are not provided', () => {
      expect(initializeEmbla(true, false)).not.toThrow()
    })

    test('The second options object parameter is not provided', () => {
      expect(initializeEmbla()).not.toThrow()
    })
  })

  describe('When initialized it does throw when', () => {
    test('The first root node parameter is not provided', () => {
      expect(EmblaCarousel).toThrow()
    })

    test('The container node is not provided', () => {
      expect(initializeEmbla(false, false)).toThrow()
    })
  })
})
