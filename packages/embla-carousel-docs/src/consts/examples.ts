import { IntersectionOptions } from 'react-intersection-observer'
import { SandboxStaticSettingsType, SandboxSelectionType } from './sandbox'
import {
  examplesDefaultWrapperStyles,
  examplesThumbsWrapperStyles,
  examplesScrollBarWrapperStyles,
  examplesIosPickerWrapperStyles,
  examplesInteractiveSizeWrapperStyles
} from 'components/Examples/examplesCarouselWrapperStyles'

const ROOT_MARGIN_VERTICAL = 190

export const EXAMPLES_INTERSECTION_OPTIONS: IntersectionOptions = {
  rootMargin: `${ROOT_MARGIN_VERTICAL}px 0px ${ROOT_MARGIN_VERTICAL}px 0px`
}

export const EXAMPLES_WRAPPERS = {
  DEFAULT: 'default',
  THUMBS: 'thumbs',
  SCROLL_BAR: 'scrollBar',
  IOS_PICKER: 'iosPicker',
  INTERACTIVE_SIZE: 'interactiveSize'
} as const

export const EXAMPLES_WRAPPER_STYLES = {
  [EXAMPLES_WRAPPERS.DEFAULT]: examplesDefaultWrapperStyles,
  [EXAMPLES_WRAPPERS.THUMBS]: examplesThumbsWrapperStyles,
  [EXAMPLES_WRAPPERS.SCROLL_BAR]: examplesScrollBarWrapperStyles,
  [EXAMPLES_WRAPPERS.IOS_PICKER]: examplesIosPickerWrapperStyles,
  [EXAMPLES_WRAPPERS.INTERACTIVE_SIZE]: examplesInteractiveSizeWrapperStyles
} as const

export type ExamplesWrapperType =
  (typeof EXAMPLES_WRAPPERS)[keyof typeof EXAMPLES_WRAPPERS]

export type ExamplesSetupType = {
  config: SandboxStaticSettingsType
  sandboxes: SandboxSelectionType[]
  Carousel?: React.FC<{
    options: SandboxStaticSettingsType['options']
    slides: SandboxStaticSettingsType['slides']
  }>
}

export type ExamplesModuleType = { EXAMPLE: ExamplesSetupType }
