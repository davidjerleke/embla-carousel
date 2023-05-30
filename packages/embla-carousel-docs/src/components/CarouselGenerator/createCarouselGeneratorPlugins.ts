import { CarouselGeneratorFormDataType } from 'consts/carouselGenerator'
import { addSandboxPlugins } from 'utils/sandbox'
import {
  SandboxPluginNameType,
  SandboxPluginsType,
  SANDBOX_PLUGINS
} from 'consts/sandbox'

export const createCarouselGeneratorPlugins = (
  settings: CarouselGeneratorFormDataType
): SandboxPluginsType | undefined => {
  const pluginList: SandboxPluginNameType[] = []

  if (settings.autoplay) pluginList.push(SANDBOX_PLUGINS.AUTOPLAY)

  return addSandboxPlugins(pluginList).plugins
}
