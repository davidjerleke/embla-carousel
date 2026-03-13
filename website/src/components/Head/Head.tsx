import { StaticImageData } from 'next/image'
import { LOCALSTORAGE_KEYS } from '@/utils/local-storage'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import { ALGOLIA_SEARCH_CONFIG } from '@/utils/algolia-search'
import {
  THEME_COLORS,
  THEME_KEYS,
  THEME_META_SELECTOR,
  THEME_PREFIX,
  THEME_STYLES
} from '@/utils/theme'
import logoLightThemeDefaultUrl from '@/assets/images/embla-logo-light-theme.svg'
import logoDarkThemeDefaultUrl from '@/assets/images/embla-logo-dark-theme.svg'
import logoLightThemeBlurUrl from '@/assets/images/embla-logo-light-theme-blur.svg'
import logoDarkThemeBlurUrl from '@/assets/images/embla-logo-dark-theme-blur.svg'

const imagesToPreload: StaticImageData[] = [
  logoLightThemeDefaultUrl,
  logoDarkThemeDefaultUrl,
  logoLightThemeBlurUrl,
  logoDarkThemeBlurUrl
]

export function Head() {
  return (
    <>
      <style
        id="theme-styles"
        key="theme-style"
        dangerouslySetInnerHTML={{
          __html: styledComponentsStylesToString(THEME_STYLES)
        }}
      />
      <script
        id="theme-script"
        key="theme-script"
        async={false}
        defer={false}
        dangerouslySetInnerHTML={{
          __html: `
          (function() {            
            let selectedTheme;
            const themeColors = {
              light: '${THEME_COLORS[THEME_KEYS.LIGHT].BACKGROUND_SITE}',
              dark: '${THEME_COLORS[THEME_KEYS.DARK].BACKGROUND_SITE}'
            };
            
            try {
              const themeStorage = localStorage.getItem('${
                LOCALSTORAGE_KEYS.THEME
              }');
              selectedTheme = (JSON.parse(themeStorage) || {}).currentTheme;
            } catch (error) {
              console.error(error);
            }

            const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches && '${
              THEME_KEYS.DARK
            }';
            const themeKey = selectedTheme || preferredTheme || '${
              THEME_KEYS.LIGHT
            }';
            const oppositeKey = themeKey === '${THEME_KEYS.LIGHT}' ? '${
            THEME_KEYS.DARK
          }' : '${THEME_KEYS.LIGHT}';
                      
            document.documentElement.classList.remove('${THEME_PREFIX}' + oppositeKey);
            document.documentElement.classList.add('${THEME_PREFIX}' + themeKey);

            const themeColorElement = document.querySelector("${THEME_META_SELECTOR}");
            if (themeColorElement) themeColorElement.setAttribute('content', themeColors[themeKey]);
            
            window.__THEME__ = themeKey;
          })();
        `
        }}
      />
      <meta
        key="theme-color"
        name="theme-color"
        content={THEME_COLORS[THEME_KEYS.LIGHT].BACKGROUND_SITE}
      />
      <meta
        key="theme-color-light"
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content={THEME_COLORS[THEME_KEYS.LIGHT].BACKGROUND_SITE}
      />
      <meta
        key="theme-color-dark"
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content={THEME_COLORS[THEME_KEYS.DARK].BACKGROUND_SITE}
      />
      <link
        key="algolia-preconnect"
        rel="preconnect"
        href={`https://${ALGOLIA_SEARCH_CONFIG.APP_ID}-dsn.algolia.net`}
        crossOrigin="anonymous"
      />
      {imagesToPreload.map((image) => (
        <link
          rel="preload"
          as="image"
          type="image/svg+xml"
          href={image.src}
          key={image.src}
        />
      ))}
    </>
  )
}
