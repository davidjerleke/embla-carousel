export const updateSelectedSnapDisplay = (emblaApi, snapDisplay) => {
  const updateSnapDisplay = (emblaApi) => {
    const selectedSnap = emblaApi.selectedScrollSnap()
    const snapCount = emblaApi.scrollSnapList().length
    snapDisplay.innerHTML = `${selectedSnap + 1} / ${snapCount}`
  }

  emblaApi.on('select', updateSnapDisplay).on('reinit', updateSnapDisplay)

  updateSnapDisplay(emblaApi)
}
