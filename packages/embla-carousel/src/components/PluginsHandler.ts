import { EmblaCarouselType } from './EmblaCarousel'
import { OptionsHandler } from './OptionsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'

export type PluginsHandlerType = {
  init: (
    plugins: EmblaPluginType[],
    embla: EmblaCarouselType,
  ) => EmblaPluginsType
  destroy: () => void
}

export function PluginsHandler(): PluginsHandlerType {
  const { atMedia } = OptionsHandler()
  let activePlugins: EmblaPluginType[] = []

  function init(
    plugins: EmblaPluginType[],
    embla: EmblaCarouselType,
  ): EmblaPluginsType {
    activePlugins = plugins.filter((plugin) => atMedia(plugin.options).active)
    activePlugins.forEach((plugin) => plugin.init(embla))

    return plugins.reduce((map, plugin) => {
      return Object.assign(map, { [plugin.name]: plugin })
    }, {})
  }

  function destroy(): void {
    activePlugins = activePlugins.filter((plugin) => plugin.destroy())
  }

  const self: PluginsHandlerType = {
    init,
    destroy,
  }
  return self
}
