import styled, { RuleSet } from 'styled-components'

import moon from './moon.svg?component'
import sun from './sun.svg?component'
import pen from './pen.svg?component'
import npm from './npm-logo.svg?component'
import github from './github-logo.svg?component'
import javascript from './javascript-logo.svg?component'
import typescript from './typescript-logo.svg?component'
import react from './react-logo.svg?component'
import solid from './solid-logo.svg?component'
import search from './search.svg?component'
import cross from './cross.svg?component'
import info from './info.svg?component'
import warning from './warning.svg?component'
import danger from './danger.svg?component'
import shrink from './shrink.svg?component'
import expand from './expand.svg?component'
import arrowLeft from './arrow-left.svg?component'
import arrowRight from './arrow-right.svg?component'
import chevronLeft from './chevron-left.svg?component'
import chevronRight from './chevron-right.svg?component'
import heartOutlined from './heart-outlined.svg?component'
import emblaLightDefault from './embla-logo-light-theme.svg?component'
import emblaDarkDefault from './embla-logo-dark-theme.svg?component'
import emblaLightBlur from './embla-logo-light-theme-blur.svg?component'
import emblaDarkBlur from './embla-logo-dark-theme-blur.svg?component'

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
  emblaLightDefault: styledSvg(emblaLightDefault),
  emblaDarkDefault: styledSvg(emblaDarkDefault),
  emblaLightBlur: styledSvg(emblaLightBlur),
  emblaDarkBlur: styledSvg(emblaDarkBlur)
}
