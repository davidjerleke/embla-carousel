import { OptionsHandler } from '../components/OptionsHandler'
import { defaultOptions } from '../components/Options'

describe('➡️  OptionsHandler', () => {
  test('An explicit undefined option keeps the base value', () => {
    const { mergeOptions } = OptionsHandler()
    const options = mergeOptions(defaultOptions, {
      loop: undefined,
      duration: undefined,
      breakpoints: { '(min-width: 1px)': { align: undefined } }
    })

    expect(options.loop).toBe(false)
    expect(options.duration).toBe(25)
    expect(
      mergeOptions(options, options.breakpoints['(min-width: 1px)']).align
    ).toBe('center')
  })
})
