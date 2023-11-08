import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import {
  BASE_STYLES,
  createCarouselArrowsDotsStyles
} from 'components/Examples/createCarouselStyles'
import { FONT_STYLES } from 'components/Layout/GlobalStyles/font'
import { RESET_STYLES } from 'components/Layout/GlobalStyles/reset'
import { SANDBOX_CSS } from 'components/Sandbox/sandboxStyles'

import { THEME_STYLES } from 'consts/themes'
import { styledComponentsStylesToString } from 'utils/styledComponentStylesToString'
import { AppModule } from './app/app.module'

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  const carouselStyles = createCarouselArrowsDotsStyles()

  styleElement.innerHTML =
    styledComponentsStylesToString(
      THEME_STYLES,
      RESET_STYLES,
      BASE_STYLES,
      FONT_STYLES
    ) +
    carouselStyles +
    SANDBOX_CSS

  document.head.appendChild(styleElement)
}

injectBaseStyles()

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))
