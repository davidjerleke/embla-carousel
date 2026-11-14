import { untrack } from 'svelte'
import type { Attachment } from 'svelte/attachments'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import type { EmblaCarouselConfigParameterType } from '../components/useEmblaCarousel'
import { createCarousel } from '../components/createCarousel'
import { getConfigOrFallback } from '../components/utils'

export type EmblaCarouselAttachmentConfigType =
  EmblaCarouselConfigParameterType & {
    onApiChange?: (api: EmblaCarouselType | undefined) => void
  }

// Reading and copying plain option records tracks nested $state changes and keeps
// previous values independent of proxies. Elements and callbacks retain identity.
function snapshot(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(snapshot)
  if (value && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, snapshot(value)])
    )
  }
  return value
}

function equal(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false
  if (!Array.isArray(a) && Object.getPrototypeOf(a) !== Object.prototype)
    return false
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  return (
    keysA.length === keysB.length &&
    keysA.every(
      (key, index) =>
        key === keysB[index] &&
        equal(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key]
        )
    )
  )
}

function createEmblaCarousel(
  getConfig: () => EmblaCarouselAttachmentConfigType = () => ({})
): Attachment<HTMLElement> {
  return (node) => {
    let carousel: ReturnType<typeof createCarousel> | undefined
    let previous:
      | { options: unknown; plugins: { plugin: unknown; options: unknown }[] }
      | undefined
    let onApiChange: EmblaCarouselAttachmentConfigType['onApiChange']

    $effect(() => {
      const config = getConfig()
      const { options, plugins } = getConfigOrFallback(config)
      const next = {
        options: snapshot(options),
        plugins: plugins.map((plugin) => ({
          plugin,
          options: snapshot(plugin.options)
        }))
      }
      const callback = config.onApiChange

      untrack(() => {
        if (!carousel) {
          carousel = createCarousel(
            node,
            config,
            createEmblaCarousel.globalOptions
          )
        } else if (
          !previous ||
          !equal(previous.options, next.options) ||
          previous.plugins.length !== next.plugins.length ||
          next.plugins.some(
            (entry, index) =>
              entry.plugin !== previous?.plugins[index].plugin ||
              !equal(entry.options, previous?.plugins[index].options)
          )
        ) {
          carousel.update(config, true)
        }
        previous = next
        if (callback !== onApiChange) {
          onApiChange?.(undefined)
          onApiChange = callback
          onApiChange?.(carousel.api)
        }
      })
    })

    return () => {
      untrack(() => {
        carousel?.destroy()
        onApiChange?.(undefined)
      })
    }
  }
}

declare namespace createEmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

createEmblaCarousel.globalOptions = undefined

export default createEmblaCarousel
