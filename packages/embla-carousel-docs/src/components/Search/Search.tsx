import React from 'react'
import { createGlobalStyle, css } from 'styled-components'
import { plainButtonStyles } from 'components/Button'
import { DocSearch } from '@docsearch/react'
import { OUTLINE_SIZE, tabAccessStyles } from 'components/TabAccess'
import { contentLinkStyles } from 'components/Link'
import { useTabAccess } from 'hooks'
import {
  createPlaceholderStyles,
  createSquareSizeStyles,
  gradientBackgroundStyles,
  gradientTextStyles,
  visuallyHiddenStyles,
} from 'utils'
import {
  ALGOLIA_SEARCH_CONFIG,
  MEDIA,
  LAYERS,
  THEME_KEYS,
  THEME_PREFIX,
  COLORS,
  SPACINGS,
} from 'consts'

const DIALOG_MAX_WIDTH = '56rem'
const INPUT_BORDER_SIZE = '0.2rem'
const SVG_STROKE_WIDTH = '0.14rem'
const INPUT_HEIGHT = SPACINGS.NINE
const BUTTON_WIDTH = SPACINGS.EIGHT
const FOOTER_HEIGHT = SPACINGS.SEVEN
const EDGE_SPACING = SPACINGS.TWO
const FRAME_TOP_OFFSET_DESKTOP = SPACINGS.SEVEN
const SCROLL_HEIGHT_COMPACT = `${EDGE_SPACING} * 2 + ${INPUT_HEIGHT} + ${FOOTER_HEIGHT}`
const SCROLL_HEIGHT_DESKTOP = `${FRAME_TOP_OFFSET_DESKTOP} + ${SCROLL_HEIGHT_COMPACT}`

const modalStyles = css`
  .DocSearch-Container {
    z-index: ${LAYERS.SEARCH};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    &:before {
      position: absolute;
      opacity: 0.9;
      background-color: ${COLORS.BACKGROUND_SITE};
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      content: '';
      display: flex;
    }
  }

  .DocSearch-Container a {
    text-decoration: none;
  }

  .DocSearch-Modal {
    padding: ${EDGE_SPACING};
    box-shadow: 0 0 0 0.1rem ${COLORS.DETAIL_LOW_CONTRAST};
    background-color: ${COLORS.BACKGROUND_SITE};
    position: relative;
    z-index: ${LAYERS.STEP};
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    ${MEDIA.DESKTOP} {
      max-width: ${DIALOG_MAX_WIDTH};
    }

    ${MEDIA.DESKTOP} {
      border-radius: 0.4rem;
      margin-top: ${FRAME_TOP_OFFSET_DESKTOP};
    }
  }
`

const headerStyles = css`
  .DocSearch-SearchBar {
    display: flex;
  }

  .DocSearch-Form {
    padding: ${INPUT_BORDER_SIZE};
    position: relative;
    width: 100%;
    border-radius: 0.4rem;
    ${gradientBackgroundStyles};
  }
`

const contentStyles = css`
  .DocSearch-NoResults,
  .DocSearch-StartScreen,
  .DocSearch-ErrorScreen {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    padding: ${SPACINGS.SIX} 0;
    font-size: 1.3rem;
    margin: 0 auto;
    text-align: center;
    width: 80%;
  }

  .DocSearch-Screen-Icon {
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
    padding-bottom: ${EDGE_SPACING};

    > svg {
      ${createSquareSizeStyles('4rem')}
    }
  }

  .DocSearch-Title {
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    margin-bottom: ${SPACINGS.THREE};
    font-size: 1.8rem;
  }

  .DocSearch-Help a {
    ${contentLinkStyles};
    ${tabAccessStyles};
  }

  .DocSearch-Dropdown {
    overflow-y: auto;
    overflow-x: hidden;

    ${MEDIA.COMPACT} {
      max-height: calc(100vh - (${SCROLL_HEIGHT_COMPACT}));
    }
    ${MEDIA.DESKTOP} {
      max-height: calc(100vh - (${SCROLL_HEIGHT_DESKTOP}));
    }
  }

  .DocSearch-Help {
    font-size: 1.3rem;
    margin: 0;
    user-select: none;
  }

  .DocSearch-Hits mark {
    ${gradientTextStyles};
    background: none;
  }

  .DocSearch-HitsFooter {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    display: flex;
    font-size: 1.4rem;
    justify-content: center;
  }

  .DocSearch-HitsFooter a {
    padding-top: ${EDGE_SPACING};
    margin-bottom: ${EDGE_SPACING};
    border-bottom: 0.1rem solid;
    color: inherit;
    display: inline-flex;
  }

  .DocSearch-Hit {
    padding-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)};
    border-radius: 0.4rem;
    display: flex;
    position: relative;
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .DocSearch-Hit--deleting {
      transition: none;
    }
  }

  .DocSearch-Hit--deleting {
    opacity: 0;
    transition: all 250ms linear;
  }

  @media screen and (prefers-reduced-motion: reduce) {
    .DocSearch-Hit--favoriting {
      transition: none;
    }
  }

  .DocSearch-Hit--favoriting {
    transform: scale(0);
    transform-origin: top center;
    transition: all 250ms linear;
    transition-delay: 250ms;
  }

  .DocSearch-Hit a {
    ${tabAccessStyles};
    outline-offset: -${OUTLINE_SIZE};
    background-color: ${COLORS.BACKGROUND_CODE};
    padding-left: ${EDGE_SPACING};
    border-radius: 0.4rem;
    display: block;
    width: 100%;
  }

  .DocSearch-Hit-source {
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    margin: 0 -${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)};
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)}
      ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)} 0;
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 3.2rem;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .DocSearch-Hit-Tree {
    ${MEDIA.COMPACT} {
      display: none;
    }
    ${MEDIA.DESKTOP} {
      color: ${COLORS.DETAIL_HIGH_CONTRAST};
      height: ${INPUT_HEIGHT};
      opacity: 0.5;
      stroke-width: ${SVG_STROKE_WIDTH};
      width: ${SPACINGS.FOUR};
    }
  }

  .DocSearch-Hit[aria-selected='true'] a {
    position: relative;
    display: block;

    &:before,
    &:after {
      content: '';
      position: absolute;
      pointer-events: none;
      top: 0;
      bottom: 0;
      left: 0;
      ${gradientBackgroundStyles};
    }

    &:before {
      width: 0.4rem;
    }
    &:after {
      border-radius: 0.4rem;
      right: 0;
      opacity: 0.07;
    }
  }

  .DocSearch-Hit-Container {
    color: ${COLORS.TEXT_MEDIUM_CONTRAST};
    height: ${INPUT_HEIGHT};
    padding: 0 ${EDGE_SPACING} 0 0;
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .DocSearch-Hit-icon {
    ${createSquareSizeStyles('2rem')}
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
    stroke-width: ${SVG_STROKE_WIDTH};
  }

  .DocSearch-Hit-action {
    ${createSquareSizeStyles('2.2rem')};
    color: ${COLORS.DETAIL_HIGH_CONTRAST};
    stroke-width: ${SVG_STROKE_WIDTH};
    align-items: center;
    display: flex;

    > svg {
      ${createSquareSizeStyles('1.8rem')};
      display: block;
    }
  }

  .DocSearch-Hit-action + .DocSearch-Hit-action {
    margin-left: ${SPACINGS.ONE};
  }

  .DocSearch-Hit-action-button {
    ${plainButtonStyles};
    color: inherit;
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.4)};
  }

  svg.DocSearch-Hit-Select-Icon {
    display: none;
  }

  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-Select-Icon {
    display: block;
  }

  .DocSearch-Hit-action-button:hover path,
  .DocSearch-Hit-action-button:focus path {
    fill: ${COLORS.TEXT_MEDIUM_CONTRAST};
  }

  .DocSearch-Hit-content-wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: 500;
    justify-content: center;
    line-height: 1.2em;
    margin: 0 ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
    overflow-x: hidden;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 80%;
  }

  .DocSearch-Hit-title {
    font-size: 1.44rem;
  }

  .DocSearch-Hit-path {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: 1.2rem;
  }

  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-title,
  .DocSearch-Hit[aria-selected='true'] mark,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-text,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-path,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-icon,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-action,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-Tree {
    color: ${COLORS.TEXT_HIGH_CONTRAST} !important;
  }

  .DocSearch-NoResults-Prefill-List {
    padding-bottom: ${SPACINGS.THREE};

    > ul {
      display: inline-block;
      padding-top: ${SPACINGS.ONE};
      font-size: 1.4rem;
    }

    li {
      color: ${COLORS.TEXT_HIGH_CONTRAST};
      list-style-position: inside;
      list-style-type: '» ';
      text-align: left;
    }
  }

  .DocSearch-Prefill {
    ${plainButtonStyles};
    ${contentLinkStyles};
    padding-top: ${SPACINGS.ONE};
    padding-bottom: ${SPACINGS.ONE};
  }
`

const footerStyles = css`
  .DocSearch-Footer {
    height: ${FOOTER_HEIGHT};
    padding-top: ${EDGE_SPACING};
    display: flex;
    flex-direction: row-reverse;
    flex-shrink: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .DocSearch-Logo a {
    ${tabAccessStyles};
    display: flex;
  }

  .DocSearch-Logo svg {
    color: #5468ff;
    margin-left: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  }

  .DocSearch-Label {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: 1.3rem;
    line-height: 1.9rem;
  }

  .DocSearch-Commands {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    ${MEDIA.COMPACT} {
      display: none;
    }
  }

  .DocSearch-Commands li {
    align-items: center;
    display: flex;
  }

  .DocSearch-Commands li:not(:last-of-type) {
    margin-right: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};;
  }

  .DocSearch-Commands-Key {
    align-items: center;
    border-radius: 0.2rem;
    background: linear-gradient(
      -225deg,
      ${COLORS.DETAIL_MEDIUM_CONTRAST} 0%,
      ${COLORS.DETAIL_HIGH_CONTRAST} 100%
    );
    box-shadow: inset 0 -0.2rem 0 0 ${COLORS.DETAIL_LOW_CONTRAST};,
      inset 0 0 0.1rem 0.1rem ${COLORS.DETAIL_MEDIUM_CONTRAST},
      0 0.1rem 0.2rem 0.1rem rgba(${
        COLORS.DETAIL_HIGH_CONTRAST_RGB_VALUE
      }, 0.4);
    display: flex;
    height: 1.8rem;
    justify-content: center;
    margin-right: 0.4em;
    padding-bottom: 0.1rem;
    width: 2rem;
  }

  .${THEME_PREFIX}${THEME_KEYS.LIGHT} {
    .DocSearch-Commands-Key {
      background: linear-gradient(
        -225deg,
        ${COLORS.DETAIL_HIGH_CONTRAST} 0%,
        ${COLORS.DETAIL_MEDIUM_CONTRAST} 100%
      );
      box-shadow: inset 0 -0.2rem 0 0 ${COLORS.DETAIL_HIGH_CONTRAST},
        inset 0 0 0.1rem 0.1rem ${COLORS.DETAIL_MEDIUM_CONTRAST},
        0 0.1rem 0.2rem 0.1rem rgba(${
          COLORS.DETAIL_LOW_CONTRAST_RGB_VALUE
        }, 0.4);
    }
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    .DocSearch-Commands-Key {
      background: linear-gradient(
        -225deg,
        ${COLORS.DETAIL_MEDIUM_CONTRAST} 0%,
        ${COLORS.DETAIL_HIGH_CONTRAST} 100%
      );
      box-shadow: inset 0 -0.2rem 0 0 ${COLORS.DETAIL_LOW_CONTRAST};,
        inset 0 0 0.1rem 0.1rem ${COLORS.DETAIL_MEDIUM_CONTRAST},
        0 0.1rem 0.2rem 0.1rem rgba(${
          COLORS.DETAIL_HIGH_CONTRAST_RGB_VALUE
        }, 0.4);
    }
  }
`

const inputStyles = css`
  .DocSearch-Input {
    ${createPlaceholderStyles(COLORS.TEXT_LOW_CONTRAST)};
    ${tabAccessStyles};
    height: calc(${INPUT_HEIGHT} - (${INPUT_BORDER_SIZE} * 2));
    padding-left: ${BUTTON_WIDTH};
    padding-right: ${BUTTON_WIDTH};
    -webkit-appearance: none;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1.8rem;
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_BODY};
    border: 0;
  }

  .DocSearch-Input::-ms-clear {
    display: none;
    ${createSquareSizeStyles('0')};
  }
  .DocSearch-Input::-ms-reveal {
    display: none;
    ${createSquareSizeStyles('0')};
  }
  .DocSearch-Input::-webkit-search-decoration,
  .DocSearch-Input::-webkit-search-cancel-button,
  .DocSearch-Input::-webkit-search-results-button,
  .DocSearch-Input::-webkit-search-results-decoration {
    display: none;
  }
`

const toggleButtonStyles = css`
  .DocSearch-Button {
    ${createSquareSizeStyles('4rem')};
    ${plainButtonStyles};
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: -${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.15)};
    margin-left: -${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.15)};

    &:hover {
      box-shadow: none;
    }
  }
  .DocSearch-Button-Placeholder,
  .DocSearch-Button-Keys {
    ${visuallyHiddenStyles}
  }
  .DocSearch-Search-Icon {
    ${createSquareSizeStyles('2.35rem')};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    stroke-width: 0.2rem;
    display: flex;
  }
`

const magnifyerButtonStyles = css`
  .DocSearch-MagnifierLabel {
    display: flex;
    width: ${BUTTON_WIDTH};
    top: ${INPUT_BORDER_SIZE};
    bottom: ${INPUT_BORDER_SIZE};
    position: absolute;
    align-items: center;
    justify-content: center;

    > svg {
      ${createSquareSizeStyles('2.35rem')};
    }
  }

  .DocSearch-Container--Stalled .DocSearch-MagnifierLabel {
    display: none;
  }
`

const resetButtonStyles = css`
  .DocSearch-Reset {
    ${plainButtonStyles};
    width: ${BUTTON_WIDTH};
    top: ${INPUT_BORDER_SIZE};
    bottom: ${INPUT_BORDER_SIZE};
    right: ${INPUT_BORDER_SIZE};
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    stroke-width: 0.2rem;
    color: ${COLORS.TEXT_HIGH_CONTRAST};

    > svg {
      ${createSquareSizeStyles('2.35rem')};
    }
  }

  .DocSearch-Reset[hidden] {
    display: none;
  }
`

const cancelButtonStyles = css`
  .DocSearch-Cancel {
    ${plainButtonStyles};
    color: ${COLORS.TEXT_BODY};
    padding-left: ${SPACINGS.CUSTOM(({ TWO }) => TWO - 0.2)};
    display: flex;
    align-items: center;
    height: ${INPUT_HEIGHT};

    ${MEDIA.DESKTOP} {
      display: none;
    }
  }
`

const loadingIndicatorStyles = css`
  .DocSearch-LoadingIndicator {
    width: ${BUTTON_WIDTH};
    top: ${INPUT_BORDER_SIZE};
    bottom: ${INPUT_BORDER_SIZE};
    position: absolute;
    align-items: center;
    justify-content: center;
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    display: none;

    > svg {
      ${createSquareSizeStyles('2.35rem')};
    }
  }

  .DocSearch-Container--Stalled .DocSearch-LoadingIndicator {
    display: flex;
  }
`

const SearchStyles = createGlobalStyle<{ $isTabbing: boolean }>`
  ${modalStyles};
  ${headerStyles};
  ${contentStyles};
  ${footerStyles};
  ${inputStyles};
  ${toggleButtonStyles};
  ${magnifyerButtonStyles};
  ${resetButtonStyles};
  ${cancelButtonStyles};
  ${loadingIndicatorStyles};
`

export const Search = () => {
  const isTabbing = useTabAccess()

  return (
    <>
      <SearchStyles $isTabbing={isTabbing} />
      <DocSearch
        appId={ALGOLIA_SEARCH_CONFIG.APP_ID}
        indexName={ALGOLIA_SEARCH_CONFIG.INDEX_NAME}
        apiKey={ALGOLIA_SEARCH_CONFIG.API_KEY}
      />
    </>
  )
}
