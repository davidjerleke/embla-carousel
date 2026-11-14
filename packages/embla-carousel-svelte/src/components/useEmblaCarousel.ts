import { ActionReturn } from 'svelte/action'
import EmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType
} from 'embla-carousel'
import { getConfigOrFallback, isHtmlElement } from './utils'
import { createCarousel } from './createCarousel'

export type EmblaCarouselConfigType = {
  options: EmblaOptionsType
  plugins: EmblaPluginType[]
}

export type EmblaCarouselConfigParameterType = Partial<EmblaCarouselConfigType>

type EmblaCarouselAttributesType = {
  'on:emblainit'?: (evt: CustomEvent<EmblaCarouselType>) => void
  onemblainit?: (evt: CustomEvent<EmblaCarouselType>) => void
}

export type UseEmblaCarouselType = ActionReturn<
  EmblaCarouselConfigParameterType,
  EmblaCarouselAttributesType
>

function useEmblaCarousel(
  emblaNode: HTMLElement,
  emblaConfig?: EmblaCarouselConfigParameterType
): UseEmblaCarouselType

function useEmblaCarousel(
  emblaConfig?: EmblaCarouselConfigParameterType
): EmblaCarouselType

function useEmblaCarousel(
  parameter1?: HTMLElement | EmblaCarouselConfigParameterType,
  parameter2?: EmblaCarouselConfigParameterType
): UseEmblaCarouselType {
  if (!isHtmlElement(parameter1)) {
    EmblaCarousel.globalOptions = useEmblaCarousel.globalOptions

    const emblaConfig = parameter1
    const { options, plugins } = getConfigOrFallback(emblaConfig)
    const serverApi = EmblaCarousel(null, options, plugins)
    return serverApi
  }

  const emblaNode = parameter1
  const emblaConfig = parameter2
  const carousel = createCarousel(
    emblaNode,
    emblaConfig,
    useEmblaCarousel.globalOptions
  )

  emblaNode.dispatchEvent(
    new CustomEvent('emblainit', { detail: carousel.api })
  )

  return { destroy: carousel.destroy, update: carousel.update }
}

declare namespace useEmblaCarousel {
  let globalOptions: EmblaOptionsType | undefined
}

useEmblaCarousel.globalOptions = undefined

export default useEmblaCarousel
