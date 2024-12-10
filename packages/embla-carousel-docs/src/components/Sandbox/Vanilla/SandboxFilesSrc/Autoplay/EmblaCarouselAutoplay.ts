import { EmblaCarouselType } from 'embla-carousel'

export const addPlayBtnListeners = (
  emblaApi: EmblaCarouselType,
  playBtn: HTMLElement
): (() => void) => {
  const togglePlayBtnState = (emblaApi: EmblaCarouselType): void => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const buttonText = autoplay.isPlaying() ? 'Start' : 'Stop'
    playBtn.innerHTML = buttonText
  }

  const onPlayBtnClick = (): void => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play
    playOrStop()
  }

  playBtn.addEventListener('click', onPlayBtnClick)
  emblaApi
    .on('autoplay:play', togglePlayBtnState)
    .on('autoplay:stop', togglePlayBtnState)
    .on('reinit', togglePlayBtnState)

  return () => {
    playBtn.removeEventListener('click', onPlayBtnClick)
    emblaApi
      .off('autoplay:play', togglePlayBtnState)
      .off('autoplay:stop', togglePlayBtnState)
      .off('reinit', togglePlayBtnState)
  }
}

export const addNavBtnListeners = (
  emblaApi: EmblaCarouselType,
  ...navButtons: HTMLElement[]
): (() => void) => {
  const onNavClick = () => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

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
