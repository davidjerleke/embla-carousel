export const addScrollBarListener = (emblaApi, scrollBarNode) => {
  if (!emblaApi || !scrollBarNode) return

  let value = 0

  const scrollToProgress = (progress) => {
    const { animation, limit, target, scrollProgress, scrollBody, scrollTo } =
      emblaApi.internalEngine()

    animation.stop()

    const currentProgress = scrollProgress.get(target.get())
    const allowedProgress = Math.min(Math.max(progress, 0), 1)
    const progressToTarget = allowedProgress - currentProgress
    const distance = progressToTarget * limit.length * -1

    scrollBody.useDuration(0)
    scrollTo.distance(distance, false)
  }

  const onScrollBarChange = (event) => {
    const target = event.target
    const newProgress = parseFloat(target.value)
    value = newProgress
    scrollToProgress(newProgress)
  }

  const setValue = (value) => {
    value = emblaApi.scrollProgress()
    scrollBarNode.value = value.toString()
  }

  emblaApi.on('scroll', (emblaApi) => {
    setValue(emblaApi.scrollProgress())
  })

  scrollBarNode.addEventListener('input', onScrollBarChange)
  setValue(emblaApi.scrollProgress())
}
