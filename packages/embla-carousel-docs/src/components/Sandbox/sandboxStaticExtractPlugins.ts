import { SandboxPluginsType, SANDBOX_PLUGINS } from 'consts/sandbox'
import { addSandboxPlugins } from 'utils/sandbox'

export const sandboxStaticExtractPlugins = (
  carouselScript: string
): SandboxPluginsType | undefined => {
  const pluginList = Object.values(SANDBOX_PLUGINS).filter((pluginName) => {
    return carouselScript.match(`from '${pluginName}'`)
  })

  return addSandboxPlugins(pluginList).plugins
}
