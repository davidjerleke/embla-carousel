import EmblaCarousel, { EmblaPluginType } from 'embla-carousel'

export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export function sortAndMapPluginToOptions(
  plugins: EmblaPluginType[],
): EmblaPluginType['options'][] {
  return plugins
    .concat()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((plugin) => plugin.options)
}

export function arePluginsEqual(
  pluginsA: EmblaPluginType[],
  pluginsB: EmblaPluginType[],
): boolean {
  if (pluginsA.length !== pluginsB.length) return false

  const { areEqual } = EmblaCarousel.optionsHandler()
  const optionsA = sortAndMapPluginToOptions(pluginsA)
  const optionsB = sortAndMapPluginToOptions(pluginsB)

  return optionsA.every((optionA, index) => {
    const optionB = optionsB[index]
    return areEqual(optionA, optionB)
  })
}
