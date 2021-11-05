import { EmblaPluginType } from 'embla-carousel'

export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export function areObjectsEqualShallow(
  objectA: { [key: string]: any },
  objectB: { [key: string]: any },
): boolean {
  return (
    Object.keys(objectA).length === Object.keys(objectB).length &&
    Object.keys(objectA).every((objectKey) => {
      if (!Object.prototype.hasOwnProperty.call(objectB, objectKey)) {
        return false
      }
      return objectA[objectKey] === objectB[objectKey]
    })
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
  const optionsA = sortAndMapPluginToOptions(pluginsA)
  const optionsB = sortAndMapPluginToOptions(pluginsB)
  return optionsA.every((optionA, index) => {
    const optionB = optionsB[index]
    return areObjectsEqualShallow(optionA, optionB)
  })
}
