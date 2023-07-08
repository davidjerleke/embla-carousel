import { EmblaOptionsType } from 'embla-carousel-react'
import { SandboxLabelKeyType } from 'consts/sandbox'

export type CarouselGeneratorFormDataType = {
  framework: SandboxLabelKeyType | ''
  loop: boolean
  dragFree: boolean
  axis: Extract<EmblaOptionsType['axis'], 'x' | 'y'>
  direction: Extract<EmblaOptionsType['direction'], 'ltr' | 'rtl'>
  accessibility: boolean
  slideSize: string
  slideGapSize: string
  edgeGap: string
  align: Extract<EmblaOptionsType['align'], 'start' | 'center' | 'end'>
  containScroll: boolean
  navigationPrevNextButtons: boolean
  navigationDots: boolean
  autoplay: boolean
  wheelGestures: boolean
}

export const CAROUSEL_GENERATOR_FORM_FIELDS = <const>{
  FRAMEWORK: 'framework',
  LOOP: 'loop',
  DRAG_FREE: 'dragFree',
  AXIS: 'axis',
  DIRECTION: 'direction',
  ACCESSIBILITY: 'accessibility',
  SLIDE_SIZE: 'slideSize',
  SLIDE_GAP_SIZE: 'slideGapSize',
  EDGE_GAP: 'edgeGap',
  ALIGN: 'align',
  CONTAIN_SCROLL: 'containScroll',
  NAVIGATION_PREV_NEXT_BUTTONS: 'navigationPrevNextButtons',
  NAVIGATION_DOTS: 'navigationDots',
  AUTOPLAY: 'autoplay',
  WHEEL_GESTURES: 'wheelGestures'
}

export const CAROUSEL_GENERATOR_FORM_PREFIX = 'carousel-generator-form'
