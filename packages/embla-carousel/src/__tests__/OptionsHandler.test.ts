import { OptionsHandler } from '../components/OptionsHandler'

const { optionsAtMedia, optionsMediaQueries } = OptionsHandler(window)
const matchMediaQuery = '(min-width: 768px)'
const matchMediaQuery2 = '(min-width: 576px)'
const notMatchMediaQuery = '(min-width: 992px)'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: [matchMediaQuery, matchMediaQuery2].includes(query)
  }))
})

describe('OptionsHandler', () => {
  describe('optionsMediaQueries', () => {
    const optionsA = {
      align: 'start',
      breakpoints: {
        [matchMediaQuery]: { align: 'center' },
        [matchMediaQuery2]: { loop: true }
      }
    }
    const optionsB = {
      align: 'end',
      breakpoints: {
        [notMatchMediaQuery]: { align: 'end' }
      }
    }

    const mediaQueries = optionsMediaQueries([optionsA, optionsB])
    expect(mediaQueries).toEqual([
      { matches: true },
      { matches: true },
      { matches: false }
    ])
  })

  describe('optionsAtMedia', () => {
    test('Returns options where breakpoint options that matchMedia are assigned to the root level', () => {
      const options = {
        loop: false,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [notMatchMediaQuery]: { align: 'end' }
        }
      }

      const matchMediaOptions = optionsAtMedia(options)
      expect(matchMediaOptions).toEqual({
        loop: true,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [notMatchMediaQuery]: { align: 'end' }
        }
      })
    })

    test('Picks the last matching query if multiple queries match', () => {
      const options = {
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { align: 'center' },
          [matchMediaQuery2]: { align: 'end' }
        }
      }

      const matchMediaOptions = optionsAtMedia(options)
      expect(matchMediaOptions).toEqual({
        align: 'end',
        breakpoints: {
          [matchMediaQuery]: { align: 'center' },
          [matchMediaQuery2]: { align: 'end' }
        }
      })
    })

    test('Merges options when multiple queries match', () => {
      const options = {
        loop: false,
        align: 'start',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [matchMediaQuery2]: { align: 'end' }
        }
      }

      const matchMediaOptions = optionsAtMedia(options)
      expect(matchMediaOptions).toEqual({
        loop: true,
        align: 'end',
        breakpoints: {
          [matchMediaQuery]: { loop: true },
          [matchMediaQuery2]: { align: 'end' }
        }
      })
    })
  })
})
