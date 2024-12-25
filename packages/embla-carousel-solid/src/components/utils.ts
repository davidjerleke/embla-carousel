import { Accessor } from 'solid-js'
import { EmblaOptionsType } from 'embla-carousel/components/Options'
import { EmblaPluginType } from 'embla-carousel/components/Plugins'

export function optionsOrFallback(
  options?: Accessor<EmblaOptionsType | undefined> | undefined
): EmblaOptionsType {
  if (!options) return {}
  return options() || {}
}

export function pluginsOrFallback(
  plugins?: Accessor<EmblaPluginType[] | undefined>
): EmblaPluginType[] {
  if (!plugins) return []
  return plugins() || []
}
