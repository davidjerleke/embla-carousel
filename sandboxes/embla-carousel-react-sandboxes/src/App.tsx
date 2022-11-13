import { useEffect } from 'react'
import { themeStyles } from '../../../packages/embla-carousel-docs/src/consts/themes'
import { resetStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/reset'
import { baseStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/base'
import { fontStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/font'
import { Sandboxes } from './Sandboxes'
import './app.css'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  const stylesList = [themeStyles, resetStyles, baseStyles, fontStyles]

  styleElement.innerHTML = stylesList.reduce(
    (allStyles, styles) => allStyles + styles.join(''),
    '',
  )
  styleElement.id = 'baseStyles'
  document.head.appendChild(styleElement)
}

export const App = () => {
  useEffect(() => injectBaseStyles(), [])

  return (
    <main className="examples">
      <h1 className="examples__h1">React - CodeSandboxes</h1>
      <Sandboxes />
    </main>
  )
}
