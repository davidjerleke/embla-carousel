import { Accessor } from 'solid-js'
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'

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
