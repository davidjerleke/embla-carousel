import styled, { RuleSet } from 'styled-components'

import moon from '@/assets/icons/moon.svg'
import sun from '@/assets/icons/sun.svg'
import pen from '@/assets/icons/pen.svg'
import npm from '@/assets/icons/npm-logo.svg'
import github from '@/assets/icons/github-logo.svg'
import javascript from '@/assets/icons/javascript-logo.svg'
import typescript from '@/assets/icons/typescript-logo.svg'
import react from '@/assets/icons/react-logo.svg'
import solid from '@/assets/icons/solid-logo.svg'
import search from '@/assets/icons/search.svg'
import cross from '@/assets/icons/cross.svg'
import info from '@/assets/icons/info.svg'
import warning from '@/assets/icons/warning.svg'
import danger from '@/assets/icons/danger.svg'
import shrink from '@/assets/icons/shrink.svg'
import expand from '@/assets/icons/expand.svg'
import arrowLeft from '@/assets/icons/arrow-left.svg'
import arrowRight from '@/assets/icons/arrow-right.svg'
import chevronLeft from '@/assets/icons/chevron-left.svg'
import chevronRight from '@/assets/icons/chevron-right.svg'
import heartOutlined from '@/assets/icons/heart-outlined.svg'
import externalLink from '@/assets/icons/external-link.svg'
import htmlTags from '@/assets/icons/html-tags.svg'
import emblaLightDefault from '@/assets/icons/embla-logo-light-theme.svg'
import emblaDarkDefault from '@/assets/icons/embla-logo-dark-theme.svg'
import emblaLightBlur from '@/assets/icons/embla-logo-light-theme-blur.svg'
import emblaDarkBlur from '@/assets/icons/embla-logo-dark-theme-blur.svg'

function styledSvg(svg: typeof moon) {
  return styled(svg)<{
    $css?: RuleSet
  }>`
    ${({ $css }) => $css};
  `
}

export type IconType = keyof typeof ICONS

export const ICONS = {
  moon: styledSvg(moon),
  sun: styledSvg(sun),
  pen: styledSvg(pen),
  npm: styledSvg(npm),
  github: styledSvg(github),
  javascript: styledSvg(javascript),
  typescript: styledSvg(typescript),
  react: styledSvg(react),
  solid: styledSvg(solid),
  search: styledSvg(search),
  cross: styledSvg(cross),
  info: styledSvg(info),
  warning: styledSvg(warning),
  danger: styledSvg(danger),
  shrink: styledSvg(shrink),
  expand: styledSvg(expand),
  heartOutlined: styledSvg(heartOutlined),
  arrowLeft: styledSvg(arrowLeft),
  arrowRight: styledSvg(arrowRight),
  chevronLeft: styledSvg(chevronLeft),
  chevronRight: styledSvg(chevronRight),
  externalLink: styledSvg(externalLink),
  htmlTags: styledSvg(htmlTags),
  emblaLightDefault: styledSvg(emblaLightDefault),
  emblaDarkDefault: styledSvg(emblaDarkDefault),
  emblaLightBlur: styledSvg(emblaLightBlur),
  emblaDarkBlur: styledSvg(emblaDarkBlur)
}
