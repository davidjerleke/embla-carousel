import { EmblaOptionsType } from './options'

export type OptionsPseudoType = {
  get: () => EmblaOptionsType
}

export function OptionsPseudo(node: HTMLElement): OptionsPseudoType {
  const pseudoString = window.getComputedStyle(node, ':before').content

  function get(): EmblaOptionsType {
    try {
      return JSON.parse(pseudoString.slice(1, -1).replace(/\\/g, ''))
    } catch (error) {} // eslint-disable-line no-empty
    return {}
  }

  const self: OptionsPseudoType = {
    get,
  }
  return self
}
