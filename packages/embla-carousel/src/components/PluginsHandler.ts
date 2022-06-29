import { EmblaCarouselType } from '.'
import { OptionsHandler } from './OptionsHandler'
import { EmblaPluginsType, EmblaPluginType } from './Plugins'

type PluginChangedHandlerType = () => boolean

export type PluginsHandlerType = {
  init: (
    plugins: EmblaPluginType[],
    embla: EmblaCarouselType,
  ) => EmblaPluginsType
  destroy: () => void
  haveChanged: PluginChangedHandlerType
}

export function PluginsHandler(): PluginsHandlerType {
  const { atMedia, areEqual } = OptionsHandler()
  let activePlugins: EmblaPluginType[]
  let pluginsChanged: PluginChangedHandlerType[] = []

  function haveChanged(): boolean {
    return pluginsChanged.some((hasChanged) => hasChanged())
  }

  function hasChanged(plugin: EmblaPluginType): PluginChangedHandlerType {
    const options = atMedia(plugin.options)
    return (): boolean => !areEqual(options, atMedia(plugin.options))
  }

  function init(
    plugins: EmblaPluginType[],
    embla: EmblaCarouselType,
  ): EmblaPluginsType {
    pluginsChanged = plugins.map(hasChanged)
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
    haveChanged,
  }
  return self
}
