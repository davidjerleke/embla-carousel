import { SPACINGS } from '@/utils/spacings'

/* CONSTS */
export const MAIN_CONTENT_ID = 'main-content'

export type PageLayoutType = (typeof PAGE_LAYOUTS)[keyof typeof PAGE_LAYOUTS]

export const PAGE_LAYOUTS = {
  HOME: 'Home',
  NOT_FOUND: '404',
  GENERATOR: 'Generator',
  DOCS: 'Docs'
} as const

export type FrameSizesType = keyof typeof PAGE_FRAME_SIZES

export const PAGE_FRAME_SIZES = {
  DEFAULT: '144rem',
  MD: '110rem',
  SM: '68rem'
}

export const PAGE_FRAME_SPACING = SPACINGS.FOUR
