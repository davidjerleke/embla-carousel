import { EmblaOptionsType } from './options'

export type OptionsPseudoType = {
  get: () => EmblaOptionsType
}

export function OptionsPseudo(node: HTMLElement): OptionsPseudoType {
  const psuedoString = window.getComputedStyle(node, ':before').content

  function get(): EmblaOptionsType {
    try {
      return JSON.parse(psuedoString.slice(1, -1).replace(/\\/g, ''))
    } catch (error) {}
    return {}
  }

  const self: OptionsPseudoType = {
    get,
  }
  return self
}
