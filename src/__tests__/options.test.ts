import { defaultOptions } from '../components/options'

describe('Options', () => {
  test('Is an immutable object', () => {
    expect(Object.isFrozen(defaultOptions)).toBe(true)
  })
})
