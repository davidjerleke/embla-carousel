import { EmblaCarouselType } from 'embla-carousel'

export const addScrollBarListener = (
  emblaApi: EmblaCarouselType,
  scrollBarNode: HTMLInputElement
): void => {
  if (!emblaApi || !scrollBarNode) return

  let value = 0

  const scrollToProgress = (progress: number): void => {
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

  const onScrollBarChange = (event: Event): void => {
    const target = <HTMLInputElement>event.target
    const newProgress = parseFloat(target.value)
    value = newProgress
    scrollToProgress(newProgress)
  }

  const setValue = (value: number): void => {
    value = emblaApi.scrollProgress()
    scrollBarNode.value = value.toString()
  }

  emblaApi.on('scroll', (emblaApi) => {
    setValue(emblaApi.scrollProgress())
  })

  scrollBarNode.addEventListener('input', onScrollBarChange)
  setValue(emblaApi.scrollProgress())
}
