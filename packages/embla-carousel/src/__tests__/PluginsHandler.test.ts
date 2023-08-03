import { EmblaCarouselType } from '../components/EmblaCarousel'
import { OptionsHandler } from '../components/OptionsHandler'
import { EmblaPluginType } from '../components/Plugins'
import { PluginsHandler } from '../components/PluginsHandler'

const optionsHandler = OptionsHandler(window)
const pluginsHandler = PluginsHandler(optionsHandler)
const autoplay: EmblaPluginType = {
  name: 'autoplay',
  init: jest.fn(),
  destroy: jest.fn(),
  options: { active: true, breakpoints: {} }
}
const classNames: EmblaPluginType = {
  name: 'classNames',
  init: jest.fn(),
  destroy: jest.fn(),
  options: { active: true, breakpoints: {} }
}
const plugins = [autoplay, classNames]
const emblaApi = <EmblaCarouselType>{}

afterEach(() => {
  jest.clearAllMocks()
})

describe('PluginsHandler', () => {
  describe('Init', () => {
    test('Initializes the plugins passed', () => {
      pluginsHandler.init(emblaApi, plugins)

      expect(autoplay.init).toHaveBeenCalledTimes(1)
      expect(classNames.init).toHaveBeenCalledTimes(1)
    })

    test('Returns a object with plugin API:s', () => {
      const pluginApis = pluginsHandler.init(emblaApi, plugins)
      expect(pluginApis).toEqual({ autoplay, classNames })
    })
  })

  describe('Destroy', () => {
    test('Destroys the plugins', () => {
      pluginsHandler.init(emblaApi, plugins)
      pluginsHandler.destroy()

      expect(autoplay.destroy).toHaveBeenCalledTimes(1)
      expect(classNames.destroy).toHaveBeenCalledTimes(1)
    })
  })
})
