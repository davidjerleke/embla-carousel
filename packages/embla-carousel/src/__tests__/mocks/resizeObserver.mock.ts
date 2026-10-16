const resizeObserverMock = jest
  .fn()
  .mockImplementation((callback: ResizeCallbackType) => ({
    observe: jest.fn(() => (resizeObserverCallback = callback)),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: resizeObserverMock
})

type ResizeCallbackType = (entries: MockResizeEntryType[]) => void
type MockResizeEntryType = Pick<ResizeObserverEntry, 'target'>
type MockResizeObserverType = Record<
  'observe' | 'unobserve' | 'disconnect',
  jest.Mock
>

let resizeObserverCallback: ResizeCallbackType | null = null

export function triggerResizeObserver(entries: MockResizeEntryType[]): void {
  if (resizeObserverCallback) resizeObserverCallback(entries)
}

export function getLatestResizeObserver(): MockResizeObserverType {
  const { results } = resizeObserverMock.mock
  return results[results.length - 1].value
}
