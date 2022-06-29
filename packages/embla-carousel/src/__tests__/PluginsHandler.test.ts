import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import { PluginsHandler } from '../components/PluginsHandler'
import { initializeEmbla } from './index.test'

const pluginsHandler = PluginsHandler()
const autoplay = Autoplay()
const classNames = ClassNames()
const plugins = [autoplay, classNames]
const embla = initializeEmbla()()

afterEach(() => {
  jest.clearAllMocks()
})

describe('PluginsHandler', () => {
  describe('Init', () => {
    test('Initializes the plugins passed', () => {
      const autoplayInitMethod = jest.spyOn(autoplay, 'init')
      const classNamesInitMethod = jest.spyOn(classNames, 'init')

      pluginsHandler.init(plugins, embla)

      expect(autoplayInitMethod).toHaveBeenCalledTimes(1)
      expect(classNamesInitMethod).toHaveBeenCalledTimes(1)
    })

    test('Returns a object with plugin API:s', () => {
      const pluginApis = pluginsHandler.init(plugins, embla)
      expect(pluginApis).toEqual({ autoplay, classNames })
    })
  })

  describe('Destroy', () => {
    test('Destroys the plugins', () => {
      const autoplayDestroyMethod = jest.spyOn(autoplay, 'destroy')
      const classNamesDestroyMethod = jest.spyOn(classNames, 'destroy')

      pluginsHandler.init(plugins, embla)
      pluginsHandler.destroy()

      expect(autoplayDestroyMethod).toHaveBeenCalledTimes(1)
      expect(classNamesDestroyMethod).toHaveBeenCalledTimes(1)
    })
  })
})
