import {
  SandboxPluginsType,
  SANDBOX_PLUGINS,
  addSandboxPlugins
} from '@/content/v8/sandboxes/sandbox-utils'

export function sandboxStaticExtractPlugins(
  carouselScript: string
): SandboxPluginsType | undefined {
  const pluginList = Object.values(SANDBOX_PLUGINS).filter((pluginName) => {
    return carouselScript.match(`from '${pluginName}'`)
  })

  return addSandboxPlugins(pluginList).plugins
}
