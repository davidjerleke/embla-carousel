declare module '*.svg?component' {
  import * as React from 'react'
  const Component: React.FC<React.SVGProps<SVGSVGElement>>
  export default Component
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
