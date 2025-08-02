export const addPlayButtonListeners = (emblaApi, playBtn) => {
  const togglePlayBtnState = (emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const buttonText = autoplay.isPlaying() ? 'Start' : 'Stop'
    playBtn.innerHTML = buttonText
  }

  const onPlayBtnClick = () => {
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

export const addNavButtonListeners = (emblaApi, ...navButtons) => {
  const onNavClick = () => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return
    autoplay.stop()
  }

  navButtons.forEach((navButton) =>
    navButton.addEventListener('click', onNavClick, true)
  )
}
