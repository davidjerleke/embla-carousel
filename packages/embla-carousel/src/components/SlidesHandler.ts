export type SlidesHandlerType = {
  init: <CallbackType extends Function>(cb: CallbackType) => void
  destroy: () => void
}

export function SlidesHandler(container: HTMLElement): SlidesHandlerType {
  let mutationObserver: MutationObserver

  function init<CallbackType extends Function>(cb: CallbackType): void {
    mutationObserver = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') cb()
      }
    })

    mutationObserver.observe(container, { childList: true })
  }

  function destroy(): void {
    mutationObserver.disconnect()
  }

  const self: SlidesHandlerType = {
    init,
    destroy,
  }
  return self
}
