import {
  SandboxPluginsType,
  SANDBOX_PLUGINS,
  SANDBOX_VENDOR_IMPORT_REGEX,
  addSandboxPlugins
} from '@/content/v8/sandboxes/sandbox-utils'

export function sandboxStaticExtractPlugins(
  carouselScript: string
): SandboxPluginsType | undefined {
  const pluginList = Object.values(SANDBOX_PLUGINS).filter((pluginName) => {
    const regex = new RegExp(
      `from ['"]${SANDBOX_VENDOR_IMPORT_REGEX.source}${pluginName}['"]`
    )
    return carouselScript.match(regex)
  })

  return addSandboxPlugins(pluginList).plugins
}
