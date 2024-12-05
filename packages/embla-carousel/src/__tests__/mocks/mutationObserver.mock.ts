Object.defineProperty(window, 'MutationObserver', {
  writable: true,
  value: jest.fn().mockImplementation((callback: MutationCallbackType) => ({
    observe: jest.fn(() => (mutationObserverCallback = callback)),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))
})

type MutationCallbackType = (mutations: MockMutationRecordType[]) => void
export type MockMutationRecordType = Pick<MutationRecord, 'type'>

let mutationObserverCallback: MutationCallbackType | null = null

export function triggerMutationObserver(
  mutations: MockMutationRecordType[]
): void {
  if (mutationObserverCallback) mutationObserverCallback(mutations)
}
