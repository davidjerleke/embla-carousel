import { AlignmentOptionType } from './Alignment'
import { AxisOptionType } from './Axis'
import { SlidesToScrollOptionType } from './SlidesToScroll'
import { DirectionOptionType } from './Direction'
import { ScrollContainOptionType } from './ScrollContain'
import { ResizeHandlerOptionType } from './ResizeHandler'
import { SlidesHandlerOptionType } from './SlidesHandler'

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
  direction: DirectionOptionType
  slidesToScroll: SlidesToScrollOptionType
  dragFree: boolean
  draggable: boolean
  inViewThreshold: number
  loop: boolean
  skipSnaps: boolean
  speed: number
  startIndex: number
  watchResize: ResizeHandlerOptionType
  watchSlides: SlidesHandlerOptionType
}>

export const defaultOptions: OptionsType = {
  align: 'center',
  axis: 'x',
  container: null,
  slides: null,
  containScroll: null,
  direction: 'ltr',
  slidesToScroll: 1,
  breakpoints: {},
  dragFree: false,
  draggable: true,
  inViewThreshold: 0,
  loop: false,
  skipSnaps: false,
  speed: 25,
  startIndex: 0,
  active: true,
  watchResize: true,
  watchSlides: true,
}

export type EmblaOptionsType = Partial<OptionsType>
