import { EmblaOptionsType } from '../../embla-carousel-vanilla/options'
import EmblaCarousel, {
  EmblaCarouselType,
} from '../../embla-carousel-vanilla/index'

// required when transpiling to es5 and web-components are used
// otherwise the following error is thrown:
// Class constructor HTMLElement cannot be invoked without 'new'
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'

const initializeEmbla = (
  withContainer: boolean = true,
  withSlides: boolean = true,
  options?: EmblaOptionsType,
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

class EmblaCarouselComponent extends HTMLElement {
  carousel?: EmblaCarouselType

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const rootNode = document.createElement('div')
    const containerNode = document.createElement('slot')
    containerNode.setAttribute('name', 'slide')

    rootNode.appendChild(containerNode)
    shadowRoot.appendChild(rootNode)

    this.carousel = EmblaCarousel(rootNode)
  }
}
window.customElements.define('embla-carousel-component', EmblaCarouselComponent)

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

  describe('When initialized inside web component with slot', () => {
    test('It uses the assigned slots as slide nodes', () => {
      const carouselNode = document.createElement(
        'embla-carousel-component',
      ) as EmblaCarouselComponent
      for (let i = 0; i < 3; i += 1) {
        const slide = document.createElement('div')
        slide.setAttribute('slot', 'slide')
        carouselNode.appendChild(slide)
      }
      document.body.appendChild(carouselNode)
      // wait until componenet got attached
      return Promise.resolve().then(() => {
        expect(carouselNode.carousel?.slideNodes().length).toBe(3)
      })
    })

    test('It uses newly assigned slots on reInit', () => {
      const carouselNode = document.createElement(
        'embla-carousel-component',
      ) as EmblaCarouselComponent
      for (let i = 0; i < 3; i += 1) {
        const slide = document.createElement('div')
        slide.setAttribute('slot', 'slide')
        carouselNode.appendChild(slide)
      }
      document.body.appendChild(carouselNode)
      carouselNode.innerHTML = ''
      const newSlide = document.createElement('div')
      newSlide.setAttribute('slot', 'slide')
      carouselNode.appendChild(newSlide)
      // wait until componenet got attached
      return Promise.resolve().then(() => {
        carouselNode.carousel?.reInit()
        expect(carouselNode.carousel?.slideNodes().length).toBe(1)
      })
    })
  })
})
