import styled, { FlattenSimpleInterpolation } from 'styled-components'

import moon from './moon.svg'
import sun from './sun.svg'
import pen from './pen.svg'
import npm from './npm-logo.svg'
import github from './github-logo.svg'
import javascript from './javascript-logo.svg'
import typescript from './typescript-logo.svg'
import react from './react-logo.svg'
import solid from './solid-logo.svg'
import search from './search.svg'
import cross from './cross.svg'
import info from './info.svg'
import warning from './warning.svg'
import danger from './danger.svg'
import shrink from './shrink.svg'
import expand from './expand.svg'
import arrowLeft from './arrow-left.svg'
import arrowRight from './arrow-right.svg'
import chevronLeft from './chevron-left.svg'
import chevronRight from './chevron-right.svg'
import emblaLightDefault from './embla-logo-light-theme.svg'
import emblaDarkDefault from './embla-logo-dark-theme.svg'
import emblaLightBlur from './embla-logo-light-theme-blur.svg'
import emblaDarkBlur from './embla-logo-dark-theme-blur.svg'

const styledSvg = (svg: typeof moon) => {
  return styled(svg)<{
    $css?: FlattenSimpleInterpolation
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
  arrowLeft: styledSvg(arrowLeft),
  arrowRight: styledSvg(arrowRight),
  chevronLeft: styledSvg(chevronLeft),
  chevronRight: styledSvg(chevronRight),
  emblaLightDefault: styledSvg(emblaLightDefault),
  emblaDarkDefault: styledSvg(emblaDarkDefault),
  emblaLightBlur: styledSvg(emblaLightBlur),
  emblaDarkBlur: styledSvg(emblaDarkBlur)
}
