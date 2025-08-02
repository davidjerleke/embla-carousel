export const setupProgressBar = (emblaApi, progressNode) => {
  const applyProgress = () => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    progressNode.style.transform = `translate3d(${progress * 100}%,0px,0px)`
  }

  return applyProgress
}
