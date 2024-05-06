import { AlignmentOptionType } from './Alignment.js'
import { AxisDirectionOptionType, AxisOptionType } from './Axis.js'
import { DragHandlerOptionType } from './DragHandler.js'
import { ResizeHandlerOptionType } from './ResizeHandler.js'
import { ScrollContainOptionType } from './ScrollContain.js'
import { SlidesHandlerOptionType } from './SlidesHandler.js'
import { SlidesInViewOptionsType } from './SlidesInView.js'
import { SlidesToScrollOptionType } from './SlidesToScroll.js'

export type LooseOptionsType = {
  [key: string]: unknown
}

export type CreateOptionsType<Type extends LooseOptionsType> = Type & {
  active: boolean
  breakpoints: {
    [key: string]: Omit<Partial<CreateOptionsType<Type>>, 'breakpoints'>
  }
}

export type OptionsType = CreateOptionsType<{
  align: AlignmentOptionType
  axis: AxisOptionType
  container: string | HTMLElement | null
  slides: string | HTMLElement[] | NodeListOf<HTMLElement> | null
  containScroll: ScrollContainOptionType
  direction: AxisDirectionOptionType
  slidesToScroll: SlidesToScrollOptionType
  dragFree: boolean
  dragThreshold: number
  inViewThreshold: SlidesInViewOptionsType
  loop: boolean
  skipSnaps: boolean
  duration: number
  startIndex: number
  watchDrag: DragHandlerOptionType
  watchResize: ResizeHandlerOptionType
  watchSlides: SlidesHandlerOptionType
}>

export const defaultOptions: OptionsType = {
  align: 'center',
  axis: 'x',
  container: null,
  slides: null,
  containScroll: 'trimSnaps',
  direction: 'ltr',
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: false,
  dragThreshold: 10,
  loop: false,
  skipSnaps: false,
  duration: 25,
  startIndex: 0,
  active: true,
  watchDrag: true,
  watchResize: true,
  watchSlides: true
}

export type EmblaOptionsType = Partial<OptionsType>
