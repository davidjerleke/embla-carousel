export const addPlayButtonListeners = (emblaApi, playBtn) => {
  const togglePlayBtnState = (emblaApi) => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const buttonText = autoScroll.isPlaying() ? 'Start' : 'Stop'
    playBtn.innerHTML = buttonText
  }

  const onPlayBtnClick = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play
    playOrStop()
  }

  playBtn.addEventListener('click', onPlayBtnClick)
  emblaApi
    .on('autoScroll:play', togglePlayBtnState)
    .on('autoScroll:stop', togglePlayBtnState)
    .on('reInit', togglePlayBtnState)
}

export const addNavButtonListeners = (emblaApi, ...navButtons) => {
  const onNavClick = () => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return
    autoScroll.stop()
  }

  navButtons.forEach((navButton) =>
    navButton.addEventListener('click', onNavClick, true)
  )
}
