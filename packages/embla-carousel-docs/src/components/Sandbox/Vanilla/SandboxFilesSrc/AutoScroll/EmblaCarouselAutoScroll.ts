import { EmblaCarouselType } from 'embla-carousel'

export const addPlayBtnListeners = (
  emblaApi: EmblaCarouselType,
  playBtn: HTMLElement
): (() => void) => {
  const togglePlayBtnState = (emblaApi: EmblaCarouselType): void => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const buttonText = autoScroll.isPlaying() ? 'Start' : 'Stop'
    playBtn.innerHTML = buttonText
  }

  const onPlayBtnClick = (): void => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play
    playOrStop()
  }

  playBtn.addEventListener('click', onPlayBtnClick)
  emblaApi
    .on('autoscroll:play', togglePlayBtnState)
    .on('autoscroll:stop', togglePlayBtnState)
    .on('reinit', togglePlayBtnState)

  return () => {
    playBtn.removeEventListener('click', onPlayBtnClick)
    emblaApi
      .off('autoscroll:play', togglePlayBtnState)
      .off('autoscroll:stop', togglePlayBtnState)
      .off('reinit', togglePlayBtnState)
  }
}

export const addNavBtnListeners = (
  emblaApi: EmblaCarouselType,
  ...navButtons: HTMLElement[]
): (() => void) => {
  const onNavClick = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const resetOrStop =
      autoScroll.options.stopOnInteraction === false
        ? autoScroll.reset
        : autoScroll.stop

    resetOrStop()
  }

  navButtons.forEach((navButton) =>
    navButton.addEventListener('click', onNavClick, true)
  )

  return () => {
    navButtons.forEach((navButton) =>
      navButton.removeEventListener('click', onNavClick, true)
    )
  }
}
