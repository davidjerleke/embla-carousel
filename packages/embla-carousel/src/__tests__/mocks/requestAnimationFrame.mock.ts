Object.defineProperty(window, 'requestAnimationFrame', {
  value: jest.fn((callback: FrameRequestCallback) => {
    callback(1)
    return 1
  }),
  writable: true
})
