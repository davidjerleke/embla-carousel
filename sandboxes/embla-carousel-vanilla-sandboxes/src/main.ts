import { styledComponentsStylesToString } from '../../../packages/embla-carousel-docs/src/utils/styledComponentStylesToString'
import { themeStyles } from '../../../packages/embla-carousel-docs/src/consts/themes'
import { resetStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/reset'
import { baseStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/base'
import { fontStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/font'
import './main.css'

// move to embla-carousel-sandbox-utils
const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')

  styleElement.innerHTML = styledComponentsStylesToString(
    themeStyles,
    resetStyles,
    baseStyles,
    fontStyles,
  )

  styleElement.id = 'baseStyles'
  document.head.appendChild(styleElement)
}

injectBaseStyles()

console.log('vanilla')
