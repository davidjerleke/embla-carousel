import Script from 'next/script'
import { LOCALSTORAGE_KEYS } from '@/utils/local-storage'
import { styledComponentsStylesToString } from '@/utils/styled-components'
import {
  THEME_COLORS,
  THEME_KEYS,
  THEME_META_SELECTOR,
  THEME_PREFIX,
  THEME_STYLES
} from '@/utils/theme'

// TODO: Add all content from gatsby-ssr.tsx to this Head component

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
      <Script
        id="theme-script"
        key="theme-script"
        strategy="beforeInteractive"
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
            document.querySelector("${THEME_META_SELECTOR}").setAttribute('content', themeColors[themeKey]);
            
            window.__THEME__ = themeKey;
          })();
        `
        }}
      />
    </>
  )
}
