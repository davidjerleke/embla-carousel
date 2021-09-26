import React from 'react'
import favicon from 'assets/images/favicon.png'
import { removeProtocol } from 'utils'
import config from './gatsby-config'
import {
  themeStyles,
  LOCALSTORAGE_KEYS,
  THEME_KEYS,
  THEME_PREFIX,
} from 'consts'

export const onRenderBody = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents,
}) => {
  const { siteUrl } = config.siteMetadata
  const htmlAttributes = { className: `${THEME_PREFIX}${THEME_KEYS.LIGHT}` }

  setHtmlAttributes(htmlAttributes)

  setHeadComponents([
    <style
      key="theme-style"
      dangerouslySetInnerHTML={{
        __html: `${themeStyles.join('')}`,
      }}
    />,
    <script
      key="theme-script"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {            
            var selectedTheme;
            
            try {
              selectedTheme = localStorage.getItem('${LOCALSTORAGE_KEYS.THEME}');
            } catch (error) {
              console.error(error);
            }

            var preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && '${THEME_KEYS.DARK}';            
            var themeKey = selectedTheme || preferredTheme || '${THEME_KEYS.LIGHT}';
            var oppositeKey = themeKey === '${THEME_KEYS.LIGHT}' ? '${THEME_KEYS.DARK}' : '${THEME_KEYS.LIGHT}';
                      
            document.documentElement.classList.remove('${THEME_PREFIX}' + oppositeKey);
            document.documentElement.classList.add('${THEME_PREFIX}' + themeKey);
            
            window.__THEME__ = themeKey;
          })();
        `,
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
      content={`${siteUrl}/share-image.jpg`}
    />,
    <meta
      key="twitter:image"
      name="twitter:image"
      content={`${siteUrl}/share-image.jpg`}
    />,
    <link key="favicon" rel="icon" href={favicon} />,
  ])

  setPreBodyComponents([
    <noscript key="noscript">
      This app only works with JavaScript enabled.
    </noscript>,
  ])
}
