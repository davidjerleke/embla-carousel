import { OptionsHandler } from '../components/OptionsHandler'

const optionsHandler = OptionsHandler()
const matchMediaQuery = '(min-width: 768px)'
const notMatchMediaQuery = '(min-width: 992px)'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: query === matchMediaQuery,
  })),
})

describe('OptionsHandler', () => {
  describe('atMedia', () => {
    test('Returns options where breakpoint options that matchMedia are assigned to the root level', () => {
      const options = {
        loop: false,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [notMatchMediaQuery]: { align: 'end' },
        },
      }

      const matchMediaOptions = optionsHandler.atMedia(options)
      expect(matchMediaOptions).toEqual({
        loop: true,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [notMatchMediaQuery]: { align: 'end' },
        },
      })
    })
  })

  describe('areEqual', () => {
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

      const optionsAreEqual = optionsHandler.areEqual(optionsA, optionsB)
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

      const optionsAreEqual = optionsHandler.areEqual(optionsA, optionsB)
      expect(optionsAreEqual).toBe(true)
    })
  })
})
