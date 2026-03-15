/* SVGS */
declare module '@/assets/images/*.svg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '@/assets/icons/*.svg' {
  import { ReactElement, SVGProps } from 'react'
  const content: (props: SVGProps<SVGElement>) => ReactElement
  export default content
}

/* FONTS */
declare module '@/assets/fonts/*.woff2' {
  const content: string
  export default content
}

/* IMAGES */
declare module '*.jpg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData
  export default content
}

declare module '*.png' {
  const content: import('next/image').StaticImageData
  export default content
}

/* HTML */
declare module '*.html' {
  const content: string
  export default content
}

/* WINDOW */
interface Window {
  __THEME__: import('consts/themes').THEME_KEYS
}
