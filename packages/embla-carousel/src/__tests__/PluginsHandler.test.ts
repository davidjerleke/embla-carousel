import { EmblaCarouselType } from '../components/EmblaCarousel'
import { EmblaPluginType } from '../components/Plugins'
import { PluginsHandler } from '../components/PluginsHandler'

const pluginsHandler = PluginsHandler()
const autoplay: EmblaPluginType = {
  name: 'autoplay',
  init: jest.fn(),
  destroy: jest.fn(),
  options: { active: true, breakpoints: {} },
}
const classNames: EmblaPluginType = {
  name: 'classNames',
  init: jest.fn(),
  destroy: jest.fn(),
  options: { active: true, breakpoints: {} },
}
const plugins = [autoplay, classNames]
const emblaApi = <EmblaCarouselType>{}

afterEach(() => {
  jest.clearAllMocks()
})

describe('PluginsHandler', () => {
  describe('Init', () => {
    test('Initializes the plugins passed', () => {
      pluginsHandler.init(plugins, emblaApi)

      expect(autoplay.init).toHaveBeenCalledTimes(1)
      expect(classNames.init).toHaveBeenCalledTimes(1)
    })

    test('Returns a object with plugin API:s', () => {
      const pluginApis = pluginsHandler.init(plugins, emblaApi)
      expect(pluginApis).toEqual({ autoplay, classNames })
    })
  })

  describe('Destroy', () => {
    test('Destroys the plugins', () => {
      pluginsHandler.init(plugins, emblaApi)
      pluginsHandler.destroy()

      expect(autoplay.destroy).toHaveBeenCalledTimes(1)
      expect(classNames.destroy).toHaveBeenCalledTimes(1)
    })
  })
})
