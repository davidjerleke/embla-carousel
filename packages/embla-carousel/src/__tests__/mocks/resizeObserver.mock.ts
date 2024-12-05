Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation((callback: ResizeCallbackType) => ({
    observe: jest.fn(() => (resizeObserverCallback = callback)),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))
})

type ResizeCallbackType = (entries: MockResizeEntryType[]) => void
type MockResizeEntryType = Pick<ResizeObserverEntry, 'target'>

let resizeObserverCallback: ResizeCallbackType | null = null

export function triggerResizeObserver(entries: MockResizeEntryType[]): void {
  if (resizeObserverCallback) resizeObserverCallback(entries)
}
