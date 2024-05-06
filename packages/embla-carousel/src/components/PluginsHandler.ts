import { EmblaCarouselType } from './EmblaCarousel.js'
import { OptionsHandlerType } from './OptionsHandler.js'
import { EmblaPluginsType, EmblaPluginType } from './Plugins.js'

export type PluginsHandlerType = {
  init: (
    emblaApi: EmblaCarouselType,
    plugins: EmblaPluginType[]
  ) => EmblaPluginsType
  destroy: () => void
}

export function PluginsHandler(
  optionsHandler: OptionsHandlerType
): PluginsHandlerType {
  let activePlugins: EmblaPluginType[] = []

  function init(
    emblaApi: EmblaCarouselType,
    plugins: EmblaPluginType[]
  ): EmblaPluginsType {
    activePlugins = plugins.filter(
      ({ options }) => optionsHandler.optionsAtMedia(options).active !== false
    )
    activePlugins.forEach((plugin) => plugin.init(emblaApi, optionsHandler))

    return plugins.reduce(
      (map, plugin) => Object.assign(map, { [plugin.name]: plugin }),
      {}
    )
  }

  function destroy(): void {
    activePlugins = activePlugins.filter((plugin) => plugin.destroy())
  }

  const self: PluginsHandlerType = {
    init,
    destroy
  }
  return self
}
