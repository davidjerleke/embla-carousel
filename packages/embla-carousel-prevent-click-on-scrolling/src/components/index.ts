import { EmblaCarouselType, EmblaPluginType } from 'embla-carousel'

function PreventClickOnScrolling(): EmblaPluginType {
  let carousel: EmblaCarouselType
  let root: HTMLElement

  function setPointerEvents(value: 'auto' | 'none'): void {
    root.style.pointerEvents = value
  }

  function disableClick() {
    setPointerEvents('none')
  }

  function enableClick() {
    setPointerEvents('auto')
  }

  function init(embla: EmblaCarouselType) {
    carousel = embla

    root = carousel.rootNode()

    carousel.on('scroll', disableClick)
    carousel.on('settle', enableClick)
  }

  function destroy() {
    carousel.off('scroll', disableClick)
    carousel.off('settle', enableClick)
  }

  const self: EmblaPluginType = {
    name: 'PreventClickOnScrolling',
    options: {},
    init,
    destroy,
  }

  return self
}

export default PreventClickOnScrolling
