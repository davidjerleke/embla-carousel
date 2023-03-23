export type SlidesHandlerType = {
  init: <CallbackType extends Function>(cb: CallbackType) => void
  destroy: () => void
}

export function SlidesHandler(container: HTMLElement): SlidesHandlerType {
  let mutationObserver: MutationObserver
  let destroyed = false

  function init<CallbackType extends Function>(cb: CallbackType): void {
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && !destroyed) cb()
      })
    })

    mutationObserver.observe(container, { childList: true })
  }

  function destroy(): void {
    mutationObserver.disconnect()
    destroyed = true
  }

  const self: SlidesHandlerType = {
    init,
    destroy,
  }
  return self
}
