import { EmblaCarouselType } from 'embla-carousel'

export const addPlayButtonListeners = (
  emblaApi: EmblaCarouselType,
  playBtn: HTMLElement
): void => {
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
}

export const addNavButtonListeners = (
  emblaApi: EmblaCarouselType,
  ...navButtons: HTMLElement[]
): void => {
  const onNavClick = () => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    autoplay.stop()
  }

  navButtons.forEach((navButton) =>
    navButton.addEventListener('click', onNavClick, true)
  )
}
