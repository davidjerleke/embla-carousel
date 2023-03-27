import { EmblaPluginType } from 'embla-carousel'

function isObject(subject: unknown): subject is Record<string, unknown> {
  return Object.prototype.toString.call(subject) === '[object Object]'
}

function isRecord(
  subject: unknown,
): subject is Record<string | number, unknown> {
  return isObject(subject) || Array.isArray(subject)
}

export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export function areOptionsEqual(
  objectA: Record<string, unknown>,
  objectB: Record<string, unknown>,
): boolean {
  const objectAKeys = Object.keys(objectA)
  const objectBKeys = Object.keys(objectB)

  if (objectAKeys.length !== objectBKeys.length) return false

  return objectAKeys.every((key) => {
    const valueA = objectA[key]
    const valueB = objectB[key]
    if (typeof valueA === 'function') return `${valueA}` === `${valueB}`
    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB
    return areOptionsEqual(valueA, valueB)
  })
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
    return areOptionsEqual(optionA, optionB)
  })
}
