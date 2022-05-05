export const PAGE_TEMPLATES = <const>{
  HOME: 'Home',
  PAGE: 'Page',
  NOT_FOUND: '404',
}

export type PageTemplateType =
  typeof PAGE_TEMPLATES[keyof typeof PAGE_TEMPLATES]
