import { EmblaCarouselType } from './EmblaCarousel'
import { OptionsHandlerType } from './OptionsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'

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
    activePlugins = plugins

    return plugins.reduce((acc, plugin) => {
      plugin.init(emblaApi, optionsHandler)
      return { ...acc, [plugin.name]: plugin }
    }, {})
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
