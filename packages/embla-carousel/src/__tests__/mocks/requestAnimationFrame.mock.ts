let nextFrameId = 1
let pendingFrames = new Map<number, FrameRequestCallback>()

Object.defineProperty(window, 'requestAnimationFrame', {
  value: jest.fn((callback: FrameRequestCallback) => {
    const id = nextFrameId++
    pendingFrames.set(id, callback)
    return id
  }),
  writable: true
})

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: jest.fn((id: number) => {
    pendingFrames.delete(id)
  }),
  writable: true
})

export function runPendingAnimationFrames(timeStamp: number = 1): void {
  const frames = pendingFrames
  pendingFrames = new Map()
  frames.forEach((frame) => frame(timeStamp))
}

export function resetAnimationFrames(): void {
  pendingFrames = new Map()
}
