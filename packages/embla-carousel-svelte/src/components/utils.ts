import {
  EmblaCarouselConfigType,
  EmblaCarouselConfigParameterType
} from './useEmblaCarousel'

export function getConfigOrFallback(
  parameter?: EmblaCarouselConfigParameterType
): EmblaCarouselConfigType {
  const parameterBase: EmblaCarouselConfigType = { options: {}, plugins: [] }
  if (!parameter) return parameterBase

  return {
    options: parameter.options || parameterBase.options,
    plugins: parameter.plugins || parameterBase.plugins
  }
}

export function isHtmlElement(
  subject?: HTMLElement | EmblaCarouselConfigParameterType
): subject is HTMLElement {
  if (typeof window === 'undefined') return false
  return subject ? 'nodeType' in subject : false
}
