import React from 'react'
import config from './gatsby-config'
import { GatsbySSR } from 'gatsby'
import {
  THEME_KEYS,
  THEME_PREFIX,
  THEME_COLORS,
  THEME_META_SELECTOR,
  THEME_STYLES
} from './src/consts/themes'
import { LOCALSTORAGE_KEYS } from './src/consts/localStorage'
import { ALGOLIA_SEARCH_CONFIG } from './src/consts/algoliaSearch'
import { FONT_FACE_STYLES } from './src/consts/fontFace'
import { styledComponentsStylesToString } from './src/utils/styledComponentStylesToString'
import { removeProtocol } from './src/utils/removeProtocol'
import logoLightThemeDefaultUrl from './src/assets/images/embla-logo-light-theme.svg'
import logoDarkThemeDefaultUrl from './src/assets/images/embla-logo-dark-theme.svg'
import logoLightThemeBlurUrl from './src/assets/images/embla-logo-light-theme-blur.svg'
import logoDarkThemeBlurUrl from './src/assets/images/embla-logo-dark-theme-blur.svg'
import interRomanVar from 'assets/fonts/Inter-roman.var.woff2'

const fontsToPreload: string[] = [interRomanVar]

const imagesToPreload: string[] = [
  logoLightThemeDefaultUrl,
  logoDarkThemeDefaultUrl,
  logoLightThemeBlurUrl,
  logoDarkThemeBlurUrl
]

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents
}) => {
  const { siteUrl } = config.siteMetadata
  const htmlAttributes = { className: `${THEME_PREFIX}${THEME_KEYS.LIGHT}` }

  setHtmlAttributes(htmlAttributes)

  setHeadComponents([
    <meta
      key="theme-color"
      name="theme-color"
      content={THEME_COLORS[THEME_KEYS.LIGHT].BACKGROUND_SITE}
    />,
    <style
      id="theme-styles"
      key="theme-style"
      dangerouslySetInnerHTML={{
        __html: styledComponentsStylesToString(THEME_STYLES)
      }}
    />,
    <script
      id="theme-script"
      key="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {            
            var selectedTheme;
            var themeColors = {
              light: '${THEME_COLORS[THEME_KEYS.LIGHT].BACKGROUND_SITE}',
              dark: '${THEME_COLORS[THEME_KEYS.DARK].BACKGROUND_SITE}'
            };
            
            try {
              selectedTheme = localStorage.getItem('${
                LOCALSTORAGE_KEYS.THEME
              }');
            } catch (error) {
              console.error(error);
            }

            var preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && '${
              THEME_KEYS.DARK
            }';
            var themeKey = selectedTheme || preferredTheme || '${
              THEME_KEYS.LIGHT
            }';
            var oppositeKey = themeKey === '${THEME_KEYS.LIGHT}' ? '${
          THEME_KEYS.DARK
        }' : '${THEME_KEYS.LIGHT}';
                      
            document.documentElement.classList.remove('${THEME_PREFIX}' + oppositeKey);
            document.documentElement.classList.add('${THEME_PREFIX}' + themeKey);
            document.querySelector("${THEME_META_SELECTOR}").setAttribute('content', themeColors[themeKey]);
            
            window.__THEME__ = themeKey;
          })();
        `
      }}
    />,
    <style
      id="font-face"
      key="font-face"
      dangerouslySetInnerHTML={{
        __html: styledComponentsStylesToString(FONT_FACE_STYLES)
      }}
    />,
    <meta
      key="mobile-web-app-capable"
      name="mobile-web-app-capable"
      content="yes"
    />,
    <meta
      key="apple-mobile-web-app-capable"
      name="apple-mobile-web-app-capable"
      content="yes"
    />,
    <meta
      key="apple-mobile-web-app-status-bar-style"
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />,
    <meta
      key="apple-mobile-web-app-title"
      name="apple-mobile-web-app-title"
      content={removeProtocol(siteUrl)}
    />,
    <meta
      key="og:image"
      property="og:image"
      content={`${siteUrl}/share-image.png`}
    />,
    <meta
      key="twitter:image"
      name="twitter:image"
      content={`${siteUrl}/share-image.png`}
    />,
    <link
      key="appleTouchIcon"
      rel="apple-touch-icon"
      href={`${siteUrl}/apple-touch-icon.png`}
    />,
    <link
      key="algolia-preconnect"
      rel="preconnect"
      href={`https://${ALGOLIA_SEARCH_CONFIG.APP_ID}-dsn.algolia.net`}
      crossOrigin="anonymous"
    />,
    fontsToPreload.map((font) => (
      <link rel="preload" as="font" type="font/woff2" href={font} key={font} />
    )),
    imagesToPreload.map((image) => (
      <link
        rel="preload"
        as="image"
        type="image/svg+xml"
        href={image}
        key={image}
      />
    ))
  ])

  setPreBodyComponents([
    <noscript key="noscript">
      This app only works with JavaScript enabled.
    </noscript>
  ])
}
