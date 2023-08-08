import EmblaCarousel, { EmblaCarouselType } from '../components/EmblaCarousel'
import { mockTestElements } from './mocks'
import { FIXTURE_PLUGINS } from './fixtures/plugins.fixture'
import { EmblaPluginType } from '../components/Plugins'

const PLUGIN_ONE: EmblaPluginType = {
  name: 'plugin-one',
  init: jest.fn(),
  destroy: jest.fn(),
  options: { active: true, breakpoints: {} }
}

const PLUGIN_TWO: EmblaPluginType = {
  name: 'plugin-two',
  init: jest.fn(),
  destroy: jest.fn(),
  options: { active: true, breakpoints: {} }
}

describe('➡️  Plugins', () => {
  let emblaApi: EmblaCarouselType

  beforeEach(() => {
    jest.clearAllMocks()
    emblaApi = EmblaCarousel(mockTestElements(FIXTURE_PLUGINS), {}, [
      PLUGIN_ONE,
      PLUGIN_TWO
    ])
  })

  test('Are initialized when the carousel is initialized with the constructor', () => {
    expect(PLUGIN_ONE.init).toHaveBeenCalledTimes(1)
    expect(PLUGIN_TWO.init).toHaveBeenCalledTimes(1)
  })

  test('Are destroyed and initalized again when the carousel reInit() method is called', () => {
    emblaApi.reInit()
    expect(PLUGIN_ONE.destroy).toHaveBeenCalledTimes(1)
    expect(PLUGIN_TWO.destroy).toHaveBeenCalledTimes(1)
    expect(PLUGIN_ONE.init).toHaveBeenCalledTimes(2)
    expect(PLUGIN_TWO.init).toHaveBeenCalledTimes(2)
  })

  test('Are destroyed when the carousel is destroyed', () => {
    emblaApi.destroy()
    expect(PLUGIN_ONE.destroy).toHaveBeenCalledTimes(1)
    expect(PLUGIN_TWO.destroy).toHaveBeenCalledTimes(1)
  })

  test('API:s are exposed when the plugins() method is called', () => {
    expect(emblaApi.plugins()[PLUGIN_ONE.name]).toEqual(PLUGIN_ONE)
    expect(emblaApi.plugins()[PLUGIN_TWO.name]).toEqual(PLUGIN_TWO)
  })
})
