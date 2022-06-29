import {
  isArray,
  isNumber,
  isObject,
  isRecord,
  objectsAreEqual,
} from '../components/utils'

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

describe('isArray', () => {
  test('Only returns true for arrays', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray(/\s/)).toBe(false)
    expect(isArray('10')).toBe(false)
    expect(isArray([])).toBe(true)
    expect(isArray({})).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray(Symbol('symbol'))).toBe(false)
    expect(isArray(NaN)).toBe(false)
    expect(isArray(10)).toBe(false)
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

describe('objectsAreEqual', () => {
  describe('Is not key order sensitive', () => {
    test('And returns true when key order is different but objects are equal', () => {
      const objectA = { string1: '1', string2: '2' }
      const objectB = { string2: '2', string1: '1' }
      const areEqual = objectsAreEqual(objectA, objectB)
      expect(areEqual).toBe(true)
    })
  })

  describe('Compares functions as strings', () => {
    test('And returns true when they are equal stringified', () => {
      const objectA = { function: () => false }
      const objectB = { function: () => false }
      const areEqual = objectsAreEqual(objectA, objectB)
      expect(areEqual).toBe(true)
    })

    test('And returns false when they are not equal stringified', () => {
      const objectA = { function: () => false }
      const objectB = { function: () => true }
      const areEqual = objectsAreEqual(objectA, objectB)
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

      const areEqual = objectsAreEqual(objectA, objectB)
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

      const areEqual = objectsAreEqual(objectA, objectB)
      expect(areEqual).toBe(false)
    })
  })
})
