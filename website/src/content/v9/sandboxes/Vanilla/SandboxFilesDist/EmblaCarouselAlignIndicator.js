export const addAlignIndicatorHandler = (emblaApi, alignIndicatorNode) => {
  let currentAlign = 'center'

  emblaApi.on('reinit', () => {
    const nextAlign = emblaApi.internalEngine().options.align || 'center'

    const currentAlignClass = `embla__align-indicator--${currentAlign}`
    alignIndicatorNode.classList.remove(currentAlignClass)

    const nextAlignClass = `embla__align-indicator--${nextAlign}`
    alignIndicatorNode.classList.add(nextAlignClass)

    currentAlign = nextAlign
  })
}
