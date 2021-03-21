import { OptionsPseudo } from '../components/optionsPseudo'

const invalidPseudoJson = `'Invalid JSON here'`
const validPseudoJson = `'{ "draggable": false }'`
const node = document.createElement('div')
let pseudoContentValue: string

const mockGetComputedStyle = (): void => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: (elt: Element, pseudoElt?: string | null | undefined) => ({
      content: pseudoElt === ':before' ? pseudoContentValue : 'none',
    }),
  })
}

beforeEach(() => {
  mockGetComputedStyle()
})

describe('OptionsPseudo', () => {
  describe('When the pseudo element property "content" contains', () => {
    test('Invalid JSON, it does not throw', () => {
      pseudoContentValue = invalidPseudoJson
      expect(OptionsPseudo(node).get).not.toThrow()
    })

    test('Invalid JSON, it returns an empty object', () => {
      pseudoContentValue = invalidPseudoJson
      expect(OptionsPseudo(node).get()).toEqual({})
    })

    test('Has valid JSON, it parses the JSON and returns its contents', () => {
      pseudoContentValue = validPseudoJson
      expect(OptionsPseudo(node).get()).toEqual({ draggable: false })
    })
  })
})
