import { OptionsHandler } from './OptionsHandler'
import { EmblaPluginType } from './Plugins'
import { arrayKeys } from './utils'

export type PluginsHandlerType = {
  areEqual: (
    pluginsA: EmblaPluginType[],
    pluginsB: EmblaPluginType[],
  ) => boolean
  filterActive: (plugins: EmblaPluginType[]) => EmblaPluginType[]
}

export function PluginsHandler(): PluginsHandlerType {
  const optionsHandler = OptionsHandler()

  function sortAndMapPluginsToOptions(
    plugins: EmblaPluginType[],
  ): EmblaPluginType['options'][] {
    return plugins
      .concat()
      .sort((pluginA, pluginB) => (pluginA.name > pluginB.name ? 1 : -1))
      .map((plugin) => optionsHandler.atMedia(plugin.options))
  }

  function areEqual(
    pluginsA: EmblaPluginType[],
    pluginsB: EmblaPluginType[],
  ): boolean {
    if (pluginsA.length !== pluginsB.length) return false
    const optionsA = sortAndMapPluginsToOptions(pluginsA)
    const optionsB = sortAndMapPluginsToOptions(pluginsB)
    return arrayKeys(optionsA).every((index) =>
      optionsHandler.areEqual(optionsA[index], optionsB[index]),
    )
  }

  function filterActive(plugins: EmblaPluginType[]): EmblaPluginType[] {
    return plugins.filter(
      (plugin) => optionsHandler.atMedia(plugin.options).active,
    )
  }

  const self: PluginsHandlerType = {
    filterActive,
    areEqual,
  }
  return self
}
