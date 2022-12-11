export const setupProgressBar = (emblaApi, progressNode) => {
  const applyProgress = () => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    progressNode.style.transform = `translateX(${progress * 100}%)`
  }

  const removeProgress = () => {
    progressNode.removeAttribute('style')
  }

  return {
    applyProgress,
    removeProgress,
  }
}
