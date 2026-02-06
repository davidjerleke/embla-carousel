/* CONSTS */
export const MAIN_CONTENT_ID = 'main-content'

export type PageLayoutType = (typeof PAGE_LAYOUTS)[keyof typeof PAGE_LAYOUTS]

export const PAGE_LAYOUTS = {
  HOME: 'Home',
  NOT_FOUND: '404',
  GENERATOR: 'Generator',
  DOCS: 'Docs'
} as const
