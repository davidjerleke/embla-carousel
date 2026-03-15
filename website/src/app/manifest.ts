import fs from 'fs'
import path from 'path'
import { MetadataRoute } from 'next'
import { GLOBAL_DATA } from '@/utils/global-data'
import { THEME_COLORS, THEME_KEYS } from '@/utils/theme'

export const dynamic = 'force-static'

const FAVICON_REGEX = /^favicon-(\d+x\d+)\.png$/
const THEME_COLOR = rgbToHex(THEME_COLORS[THEME_KEYS.DARK].BRAND_PRIMARY)
const BACKGROUND_COLOR = rgbToHex(THEME_COLORS[THEME_KEYS.DARK].BACKGROUND_SITE)

function getFaviconIcons(): MetadataRoute.Manifest['icons'] {
  const publicDir = path.join(process.cwd(), 'public')

  return fs
    .readdirSync(publicDir)
    .filter((file) => FAVICON_REGEX.test(file))
    .map((file) => {
      const [, sizes] = file.match(FAVICON_REGEX)!
      return { src: `/${file}`, sizes, type: 'image/png' }
    })
}

function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number)
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')
}

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: GLOBAL_DATA.TITLE,
    short_name: GLOBAL_DATA.TITLE,
    description: GLOBAL_DATA.DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    lang: 'en',
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    icons: getFaviconIcons()
  }
}
