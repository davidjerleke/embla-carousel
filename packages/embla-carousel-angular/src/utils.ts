import { InjectionToken, Provider } from '@angular/core'
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'

export const EMBLA_OPTIONS_TOKEN = new InjectionToken<
  EmblaOptionsType | undefined
>('embla global options', {
  factory: () => undefined
})

export function provideEmblaGlobalOptions(
  options?: EmblaOptionsType
): Provider[] {
  return [
    {
      provide: EMBLA_OPTIONS_TOKEN,
      useValue: options
    }
  ]
}

export function isObject(subject: unknown): subject is Record<string, unknown> {
  return Object.prototype.toString.call(subject) === '[object Object]'
}

export function isRecord(
  subject: unknown
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
  optionsA: EmblaOptionsType,
  optionsB: EmblaOptionsType
): boolean {
  const optionsAKeys = Object.keys(optionsA) as Array<keyof EmblaOptionsType>
  const optionsBKeys = Object.keys(optionsB) as Array<keyof EmblaOptionsType>

  if (optionsAKeys.length !== optionsBKeys.length) return false

  const breakpointsA = JSON.stringify(Object.keys(optionsA.breakpoints || {}))
  const breakpointsB = JSON.stringify(Object.keys(optionsB.breakpoints || {}))

  if (breakpointsA !== breakpointsB) return false

  return optionsAKeys.every((key) => {
    const valueA = optionsA[key]
    const valueB = optionsB[key]
    if (typeof valueA === 'function') return `${valueA}` === `${valueB}`
    if (!isRecord(valueA) || !isRecord(valueB)) return valueA === valueB
    return areOptionsEqual(valueA, valueB)
  })
}

export function sortAndMapPluginToOptions(
  plugins: EmblaPluginType[]
): EmblaPluginType['options'][] {
  return plugins
    .concat()
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((plugin) => plugin.options)
}

export function arePluginsEqual(
  pluginsA: EmblaPluginType[],
  pluginsB: EmblaPluginType[]
): boolean {
  if (pluginsA.length !== pluginsB.length) return false

  const optionsA = sortAndMapPluginToOptions(pluginsA)
  const optionsB = sortAndMapPluginToOptions(pluginsB)

  return optionsA.every((optionA, index) => {
    const optionB = optionsB[index]
    return areOptionsEqual(optionA, optionB)
  })
}
