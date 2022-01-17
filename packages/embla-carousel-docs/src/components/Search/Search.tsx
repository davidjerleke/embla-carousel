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
  breakpoints,
  LAYERS,
  THEME_KEYS,
  THEME_PREFIX,
} from 'consts'

const DIALOG_MAX_WIDTH = '56rem'
const INPUT_BORDER_SIZE = '0.2rem'
const INPUT_HEIGHT = '5.6rem'
const BUTTON_WIDTH = '4.8rem'
const FOOTER_HEIGHT = '4.4rem'
const EDGE_SPACING = '1.2rem'
const SVG_STROKE_WIDTH = '0.14rem'
const FRAME_TOP_OFFSET_DESKTOP = '4rem'
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
      background-color: var(--background-site);
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
    box-shadow: 0 0 0 0.1rem var(--detail-low-contrast);
    background-color: var(--background-site);
    position: relative;
    z-index: ${LAYERS.STEP};
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    ${breakpoints.desktop} {
      max-width: ${DIALOG_MAX_WIDTH};
    }

    ${breakpoints.desktop} {
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
    color: var(--text-low-contrast);
    font-size: 1.3rem;
    margin: 0 auto;
    padding: 3.6rem 0;
    text-align: center;
    width: 80%;
  }

  .DocSearch-Screen-Icon {
    color: var(--detail-high-contrast);
    padding-bottom: ${EDGE_SPACING};

    > svg {
      ${createSquareSizeStyles('4rem')}
    }
  }

  .DocSearch-Title {
    font-size: 1.8rem;
    color: var(--text-high-contrast);
    margin-bottom: 1.8rem;
  }

  .DocSearch-Help a {
    ${contentLinkStyles};
    ${tabAccessStyles};
  }

  .DocSearch-Dropdown {
    overflow-y: auto;
    overflow-x: hidden;

    ${breakpoints.compact} {
      max-height: calc(100vh - (${SCROLL_HEIGHT_COMPACT}));
    }
    ${breakpoints.desktop} {
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
    color: var(--text-low-contrast);
    display: flex;
    font-size: 1.4rem;
    justify-content: center;
  }

  .DocSearch-HitsFooter a {
    border-bottom: 0.1rem solid;
    color: inherit;
    display: inline-flex;
    padding-top: ${EDGE_SPACING};
    margin-bottom: ${EDGE_SPACING};
  }

  .DocSearch-Hit {
    border-radius: 0.4rem;
    padding-bottom: 0.4rem;
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
    background-color: var(--background-code);
    border-radius: 0.4rem;
    display: block;
    padding-left: ${EDGE_SPACING};
    width: 100%;
  }

  .DocSearch-Hit-source {
    background-color: var(--background-site);
    color: var(--text-high-contrast);
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 3.2rem;
    margin: 0 -0.4rem;
    padding: 0.8rem 0.4rem 0;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .DocSearch-Hit-Tree {
    ${breakpoints.compact} {
      display: none;
    }
    ${breakpoints.desktop} {
      color: var(--detail-high-contrast);
      height: ${INPUT_HEIGHT};
      opacity: 0.5;
      stroke-width: ${SVG_STROKE_WIDTH};
      width: 2.4rem;
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
    align-items: center;
    color: var(--text-medium-contrast);
    display: flex;
    flex-direction: row;
    height: ${INPUT_HEIGHT};
    padding: 0 ${EDGE_SPACING} 0 0;
  }

  .DocSearch-Hit-icon {
    ${createSquareSizeStyles('2rem')}
    color: var(--detail-high-contrast);
    stroke-width: ${SVG_STROKE_WIDTH};
  }

  .DocSearch-Hit-action {
    ${createSquareSizeStyles('2.2rem')};
    color: var(--detail-high-contrast);
    stroke-width: ${SVG_STROKE_WIDTH};
    align-items: center;
    display: flex;

    > svg {
      ${createSquareSizeStyles('1.8rem')};
      display: block;
    }
  }

  .DocSearch-Hit-action + .DocSearch-Hit-action {
    margin-left: 0.6rem;
  }

  .DocSearch-Hit-action-button {
    ${plainButtonStyles};
    color: inherit;
    padding: 0.2rem;
  }

  svg.DocSearch-Hit-Select-Icon {
    display: none;
  }

  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-Select-Icon {
    display: block;
  }

  .DocSearch-Hit-action-button:hover path,
  .DocSearch-Hit-action-button:focus path {
    fill: var(--text-medium-contrast);
  }

  .DocSearch-Hit-content-wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: 500;
    justify-content: center;
    line-height: 1.2em;
    margin: 0 0.8rem;
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
    color: var(--text-low-contrast);
    font-size: 1.2rem;
  }

  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-title,
  .DocSearch-Hit[aria-selected='true'] mark,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-text,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-path,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-icon,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-action,
  .DocSearch-Hit[aria-selected='true'] .DocSearch-Hit-Tree {
    color: var(--text-high-contrast) !important;
  }

  .DocSearch-NoResults-Prefill-List {
    padding-bottom: 1.8rem;

    > ul {
      display: inline-block;
      padding-top: 0.6rem;
      font-size: 1.4rem;
    }

    li {
      color: var(--text-high-contrast);
      list-style-position: inside;
      list-style-type: '» ';
      text-align: left;
    }
  }

  .DocSearch-Prefill {
    ${plainButtonStyles};
    ${contentLinkStyles};
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
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
    margin-left: 0.8rem;
  }

  .DocSearch-Label {
    color: var(--text-low-contrast);
    font-size: 1.3rem;
    line-height: 1.9rem;
  }

  .DocSearch-Commands {
    color: var(--text-low-contrast);
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    ${breakpoints.compact} {
      display: none;
    }
  }

  .DocSearch-Commands li {
    align-items: center;
    display: flex;
  }

  .DocSearch-Commands li:not(:last-of-type) {
    margin-right: 0.8rem;
  }

  .DocSearch-Commands-Key {
    align-items: center;
    border-radius: 0.2rem;
    background: linear-gradient(
      -225deg,
      var(--detail-medium-contrast) 0%,
      var(--detail-high-contrast) 100%
    );
    box-shadow: inset 0 -0.2rem 0 0 var(--detail-low-contrast),
      inset 0 0 0.1rem 0.1rem var(--detail-medium-contrast),
      0 0.1rem 0.2rem 0.1rem rgba(var(--detail-high-contrast-rgb-value), 0.4);
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
        var(--detail-high-contrast) 0%,
        var(--detail-medium-contrast) 100%
      );
      box-shadow: inset 0 -0.2rem 0 0 var(--detail-high-contrast),
        inset 0 0 0.1rem 0.1rem var(--detail-medium-contrast),
        0 0.1rem 0.2rem 0.1rem rgba(var(--detail-low-contrast-rgb-value), 0.4);
    }
  }
  .${THEME_PREFIX}${THEME_KEYS.DARK} {
    .DocSearch-Commands-Key {
      background: linear-gradient(
        -225deg,
        var(--detail-medium-contrast) 0%,
        var(--detail-high-contrast) 100%
      );
      box-shadow: inset 0 -0.2rem 0 0 var(--detail-low-contrast),
        inset 0 0 0.1rem 0.1rem var(--detail-medium-contrast),
        0 0.1rem 0.2rem 0.1rem rgba(var(--detail-high-contrast-rgb-value), 0.4);
    }
  }
`

const inputStyles = css`
  .DocSearch-Input {
    ${createPlaceholderStyles('var(--text-low-contrast)')};
    ${tabAccessStyles};
    height: calc(${INPUT_HEIGHT} - (${INPUT_BORDER_SIZE} * 2));
    padding-left: ${BUTTON_WIDTH};
    padding-right: ${BUTTON_WIDTH};
    -webkit-appearance: none;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1.8rem;
    background-color: var(--background-site);
    color: var(--text-body);
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
    margin-right: -0.75rem;
    margin-left: -0.75rem;

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
    color: var(--text-high-contrast);
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
    color: var(--text-high-contrast);

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
    color: var(--text-body);
    padding-left: 1rem;
    display: flex;
    align-items: center;
    height: ${INPUT_HEIGHT};

    ${breakpoints.desktop} {
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
    color: var(--text-high-contrast);
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
