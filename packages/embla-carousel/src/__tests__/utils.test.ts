import { isString, isNumber, isBoolean, isObject } from '../components/utils'

describe('isString', () => {
  test('Only returns true for strings', () => {
    expect(isString(null)).toBe(false)
    expect(isString(undefined)).toBe(false)
    expect(isString(/\s/)).toBe(false)
    expect(isString('10')).toBe(true)
    expect(isString([])).toBe(false)
    expect(isString({})).toBe(false)
    expect(isString(true)).toBe(false)
    expect(isString(Symbol('symbol'))).toBe(false)
    expect(isString(NaN)).toBe(false)
    expect(isString(10)).toBe(false)
  })
})

describe('isNumber', () => {
  test('Only returns true for numbers', () => {
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
    expect(isNumber(/\s/)).toBe(false)
    expect(isNumber('10')).toBe(false)
    expect(isNumber([])).toBe(false)
    expect(isNumber({})).toBe(false)
    expect(isNumber(true)).toBe(false)
    expect(isNumber(Symbol('symbol'))).toBe(false)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(10)).toBe(true)
  })
})

describe('isBoolean', () => {
  test('Only returns true for objects', () => {
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(undefined)).toBe(false)
    expect(isBoolean(/\s/)).toBe(false)
    expect(isBoolean('10')).toBe(false)
    expect(isBoolean([])).toBe(false)
    expect(isBoolean({})).toBe(false)
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isBoolean(Symbol('symbol'))).toBe(false)
    expect(isBoolean(NaN)).toBe(false)
    expect(isBoolean(10)).toBe(false)
  })
})

describe('isObject', () => {
  test('Only returns true for objects', () => {
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject(/\s/)).toBe(false)
    expect(isObject('10')).toBe(false)
    expect(isObject([])).toBe(false)
    expect(isObject({})).toBe(true)
    expect(isObject(true)).toBe(false)
    expect(isObject(Symbol('symbol'))).toBe(false)
    expect(isObject(NaN)).toBe(false)
    expect(isObject(10)).toBe(false)
  })
})
