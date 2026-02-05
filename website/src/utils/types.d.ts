declare module '@/assets/images/*.svg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '@/assets/icons/*.svg' {
  import { ReactElement, SVGProps } from 'react'
  const content: (props: SVGProps<SVGElement>) => ReactElement
  export default content
}

declare module '@/assets/fonts/*.woff2' {
  const content: string
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
}
