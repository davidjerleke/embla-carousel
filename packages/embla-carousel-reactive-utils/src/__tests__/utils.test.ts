import { isObject, isRecord, areOptionsEqual } from '../components/utils'

const matchMediaQuery = '(min-width: 768px)'
const notMatchMediaQuery = '(min-width: 992px)'

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

describe('isRecord', () => {
  test('Only returns true for objects or arrays', () => {
    expect(isRecord(null)).toBe(false)
    expect(isRecord(undefined)).toBe(false)
    expect(isRecord(/\s/)).toBe(false)
    expect(isRecord('10')).toBe(false)
    expect(isRecord([])).toBe(true)
    expect(isRecord({})).toBe(true)
    expect(isRecord(true)).toBe(false)
    expect(isRecord(Symbol('symbol'))).toBe(false)
    expect(isRecord(NaN)).toBe(false)
    expect(isRecord(10)).toBe(false)
  })
})

describe('areOptionsEqual', () => {
  describe('Compares functions as strings', () => {
    test('And returns true when they are equal stringified', () => {
      const objectA = { function: () => false }
      const objectB = { function: () => false }
      const areEqual = areOptionsEqual(objectA, objectB)
      expect(areEqual).toBe(true)
    })

    test('And returns false when they are not equal stringified', () => {
      const objectA = { function: () => false }
      const objectB = { function: () => true }
      const areEqual = areOptionsEqual(objectA, objectB)
      expect(areEqual).toBe(false)
    })
  })

  describe('Compares all other types by strict equality', () => {
    test('And returns true when both objects are equal', () => {
      const element = document.createElement('div')
      const nestedElement = document.createElement('div')

      const objectA = {
        boolean: false,
        string: 'a',
        array: ['a1', 'a2'],
        element,
        function: () => false,
        object: {
          nestedObject: {
            nestedBoolean: false,
            nestedString: 'a',
            nestedElement,
            nestedFunction: () => false,
            nestedArray: [
              'a1',
              'a2',
              {
                nestedBoolean: false,
                nestedString: 'a',
                nestedArray: ['a1', 'a2'],
                nestedElement,
                nestedFunction: () => false,
              },
            ],
          },
        },
      }
      const objectB = {
        boolean: false,
        string: 'a',
        array: ['a1', 'a2'],
        element,
        function: () => false,
        object: {
          nestedObject: {
            nestedBoolean: false,
            nestedString: 'a',
            nestedElement,
            nestedFunction: () => false,
            nestedArray: [
              'a1',
              'a2',
              {
                nestedBoolean: false,
                nestedString: 'a',
                nestedArray: ['a1', 'a2'],
                nestedElement,
                nestedFunction: () => false,
              },
            ],
          },
        },
      }

      const areEqual = areOptionsEqual(objectA, objectB)
      expect(areEqual).toBe(true)
    })

    test('And returns false when both objects are not equal', () => {
      const element = document.createElement('div')
      const nestedElement = document.createElement('div')

      const objectA = {
        boolean: false,
        string: 'a',
        array: ['a1', 'a2'],
        element,
        function: () => false,
        object: {
          nestedObject: {
            nestedBoolean: true,
            nestedString: 'a',
            nestedElement,
            nestedFunction: () => false,
            nestedArray: [
              'a1',
              'a2',
              {
                nestedBoolean: false,
                nestedString: 'a',
                nestedArray: ['a1', 'a2'],
                nestedElement,
                nestedFunction: () => false,
              },
            ],
          },
        },
      }
      const objectB = {
        boolean: false,
        string: 'a',
        array: ['a1', 'a2'],
        element,
        function: () => false,
        object: {
          nestedObject: {
            nestedBoolean: false,
            nestedString: 'a',
            nestedElement,
            nestedFunction: () => false,
            nestedArray: [
              'a1',
              'a2',
              {
                nestedBoolean: false,
                nestedString: 'a',
                nestedArray: ['a1', 'a2'],
                nestedElement,
                nestedFunction: () => false,
              },
            ],
          },
        },
      }

      const areEqual = areOptionsEqual(objectA, objectB)
      expect(areEqual).toBe(false)
    })
  })

  describe('Key order sensitive', () => {
    test('Is key order sensitive for breakpoint option keys', () => {
      const optionsA = {
        loop: false,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [notMatchMediaQuery]: { align: 'end' },
        },
      }
      const optionsB = {
        loop: false,
        align: 'start',
        breakpoints: {
          [notMatchMediaQuery]: { align: 'end' },
          [matchMediaQuery]: { loop: true },
        },
      }

      const optionsAreEqual = areOptionsEqual(optionsA, optionsB)
      expect(optionsAreEqual).toBe(false)
    })

    test('Is not key order sensitive for any other option keys', () => {
      const optionsA = {
        loop: false,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: {
            loop: true,
            align: 'end',
          },
        },
      }
      const optionsB = {
        align: 'start',
        loop: false,
        breakpoints: {
          [matchMediaQuery]: {
            align: 'end',
            loop: true,
          },
        },
      }

      const optionsAreEqual = areOptionsEqual(optionsA, optionsB)
      expect(optionsAreEqual).toBe(true)
    })
  })
})
