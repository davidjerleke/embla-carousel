import { defaultOptions } from '../components/options'

describe('Options', () => {
  test('Default Options object is immutable', () => {
    expect(Object.isFrozen(defaultOptions)).toBe(true)
  })
})
