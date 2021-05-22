declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react'
  const content: (props: SVGProps<SVGElement>) => ReactElement
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

interface Window {
  __THEME__: import('consts/themes').THEME_KEYS
  __DOCSEARCH__: ReturnType<import('consts/algoliaSearch').AlgoliaDocsearchType>
  docsearch: import('consts/algoliaSearch').AlgoliaDocsearchType
}
