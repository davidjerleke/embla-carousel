import EmblaCarousel from 'embla-carousel'
import useEmblaCarousel from '../components/useEmblaCarousel'

jest.mock('embla-carousel', () => ({ __esModule: true, default: jest.fn() }))

const reInit = jest.fn()
const destroy = jest.fn()
const api = { reInit, destroy }

beforeEach(() => {
  jest.clearAllMocks()
  useEmblaCarousel.globalOptions = undefined
  ;(EmblaCarousel as unknown as jest.Mock).mockReturnValue(api)
})

test('preserves the default action, init event and global options', () => {
  const node = document.createElement('div')
  const onInit = jest.fn()
  node.addEventListener('emblainit', onInit)
  useEmblaCarousel.globalOptions = { loop: true }
  const action = useEmblaCarousel(node)
  expect(EmblaCarousel.globalOptions).toEqual({ loop: true })
  expect(EmblaCarousel).toHaveBeenCalledWith(node, {}, [])
  expect(onInit.mock.calls[0][0].detail).toBe(api)
  action.destroy?.()
  action.destroy?.()
  expect(destroy).toHaveBeenCalledTimes(1)
})

test('updates only changed configuration and ignores updates after cleanup', () => {
  const action = useEmblaCarousel(document.createElement('div'), {
    options: { loop: true }
  })
  action.update?.({ options: { loop: true } })
  expect(reInit).not.toHaveBeenCalled()
  action.update?.({ options: { loop: false } })
  expect(reInit).toHaveBeenCalledWith({ loop: false }, [])
  action.destroy?.()
  action.update?.({ options: { loop: true } })
  expect(reInit).toHaveBeenCalledTimes(1)
})

test('preserves the server API overload', () => {
  expect(useEmblaCarousel({ options: { loop: true } })).toBe(api)
  expect(EmblaCarousel).toHaveBeenCalledWith(null, { loop: true }, [])
})
