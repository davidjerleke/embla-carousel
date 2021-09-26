import { OptionsPseudo } from '../components/OptionsPseudo'

const invalidPseudoJson = `'Invalid JSON here'`
const validPseudoJson = `'{ "draggable": false }'`
const node = document.createElement('div')

const mockGetComputedStyle = (pseudoContentValue: string): void => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: (elt: Element, pseudoElt?: string | null | undefined) => ({
      content: pseudoElt === ':before' ? pseudoContentValue : 'none',
    }),
  })
}

describe('OptionsPseudo', () => {
  describe('When the pseudo element property "content" contains', () => {
    test('Invalid JSON, it does not throw', () => {
      mockGetComputedStyle(invalidPseudoJson)
      expect(OptionsPseudo(node).get).not.toThrow()
    })

    test('Invalid JSON, it returns an empty object', () => {
      mockGetComputedStyle(invalidPseudoJson)
      expect(OptionsPseudo(node).get()).toEqual({})
    })

    test('Valid JSON, it parses the JSON and returns its contents', () => {
      mockGetComputedStyle(validPseudoJson)
      expect(OptionsPseudo(node).get()).toEqual({ draggable: false })
    })
  })
})
