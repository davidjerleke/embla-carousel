import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { flushSync } from 'react-dom'
import imageByIndex from './imageByIndex'
 
const TWEEN_FACTOR = 3
 
const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)
 
type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}
 
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [tweenValues, setTweenValues] = useState<number[]>([])
 
  const onScroll = useCallback(() => {
    if (!emblaApi) return
 
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
 
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      if (!emblaApi.slidesInView().includes(index)) return 0
      let diffToTarget = scrollSnap - scrollProgress
 
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target().get()
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      const scale = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
      return numberWithinRange(scale, 0, 1)
    })
    setTweenValues(styles)
  }, [emblaApi, setTweenValues])
 
  useEffect(() => {
    if (!emblaApi) return
 
    onScroll()
    emblaApi.on('scroll', () => {
      flushSync(() => onScroll())
    })
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, onScroll])
 
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div
                className="embla__scale"
                style={{ transform: `scale(${tweenValues[index]})` }}
              >
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="embla__slide__img"
                  src={imageByIndex(index)}
                  alt="A cool cat."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
 
export default EmblaCarousel
