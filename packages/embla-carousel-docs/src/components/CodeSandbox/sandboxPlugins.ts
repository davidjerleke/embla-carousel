import docsPackageJson from 'embla-carousel-docs/package.json'
import { SandboxPluginsType, SandboxSharedCreateType } from './sandboxTypes'

type SandboxPluginNameType = keyof SandboxPluginsType

export const SANDBOX_PLUGIN_AUTOPLAY: SandboxPluginNameType =
  'embla-carousel-autoplay'
export const SANDBOX_PLUGIN_CLASS_NAMES: SandboxPluginNameType =
  'embla-carousel-class-names'

export const addSandboxPlugins = (
  pluginNames: SandboxPluginNameType | SandboxPluginNameType[],
): Pick<SandboxSharedCreateType, 'plugins'> => {
  const pluginsArray = Array.isArray(pluginNames) ? pluginNames : [pluginNames]

  return {
    plugins: {
      ...pluginsArray.reduce(
        (allPlugins, pluginName) => ({
          ...allPlugins,
          [pluginName]: docsPackageJson.dependencies[pluginName],
        }),
        {},
      ),
    },
  }
}
