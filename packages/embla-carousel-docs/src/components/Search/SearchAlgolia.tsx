import React, { useCallback, useEffect, useRef } from 'react'
import { createGlobalStyle, css } from 'styled-components'
import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { selectKeyNavigating } from 'components/KeyEvents/keyEventsReducer'
import { DocSearch } from '@docsearch/react'
import { buttonBareStyles } from 'components/Button/ButtonBare'
import { linkContentStyles } from 'components/Link/LinkContent'
import { createPlaceholderStyles } from 'utils/createPlaceholderStyles'
import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
import { BRAND_GRADIENT_BACKGROUND_STYLES } from 'consts/gradients'
import { BRAND_GRADIENT_TEXT_STYLES } from 'consts/gradients'
import { visuallyHiddenStyles } from 'utils/visuallyHiddenStyles'
import { ALGOLIA_CLASSNAMES, ALGOLIA_SEARCH_CONFIG } from 'consts/algoliaSearch'
import { MODALS } from 'consts/modal'
import { MEDIA } from 'consts/breakpoints'
import { LAYERS } from 'consts/layers'
import { SPACINGS } from 'consts/spacings'
import { THEME_KEYS, THEME_PREFIX, COLORS } from 'consts/themes'
import { FONT_SIZES, FONT_WEIGHTS } from 'consts/fontSizes'
import { BORDER_RADIUSES, BORDER_SIZES } from 'consts/border'
import { KEY_NAVIGATING_STYLES } from 'consts/keyEvents'
import { isBrowser } from 'utils/isBrowser'
import {
  selectIsModalOpen,
  setAllModalsClosed,
  setModalClosed,
  setModalOpen
} from 'components/Modal/modalReducer'
import {
  searchButtonIconStyles,
  searchButtonStyles
} from 'components/Search/SearchButton'

const MODAL_MAX_WIDTH = '56rem'
const INPUT_BORDER_SIZE = '0.2rem'
const SVG_STROKE_WIDTH = '0.14rem'
const INPUT_HEIGHT = SPACINGS.NINE
const BUTTON_WIDTH = SPACINGS.EIGHT
const DESKTOP_END_SPACING = SPACINGS.TEN
const EDGE_SPACING = SPACINGS.TWO

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
    box-shadow: 0 0 0 ${BORDER_SIZES.DETAIL} ${COLORS.DETAIL_LOW_CONTRAST};
    background-color: ${COLORS.BACKGROUND_SITE};
    z-index: ${LAYERS.STEP};
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;

    ${MEDIA.DESKTOP} {
      border-radius: ${BORDER_RADIUSES.SOFT};
      max-width: ${MODAL_MAX_WIDTH};
      margin: ${DESKTOP_END_SPACING} auto;
      height: calc(100vh - ${DESKTOP_END_SPACING} * 2);
    }
  }
`

const headerStyles = css`
  .DocSearch-SearchBar {
    display: flex;
    flex: 0 0 auto;
  }

  .DocSearch-Form {
    padding: ${INPUT_BORDER_SIZE};
    position: relative;
    width: 100%;
    border-radius: ${BORDER_RADIUSES.BOX};
    ${BRAND_GRADIENT_BACKGROUND_STYLES};
  }
`

const contentStyles = css`
  .DocSearch-NoResults,
  .DocSearch-StartScreen,
  .DocSearch-ErrorScreen {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    padding: ${SPACINGS.SIX} 0;
    font-size: ${FONT_SIZES.COMPLEMENTARY};
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
    font-size: ${FONT_SIZES.H4};
  }

  .DocSearch-Help a {
    ${linkContentStyles};
    ${KEY_NAVIGATING_STYLES};
  }

  .DocSearch-Dropdown {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1 1 0;
  }

  .DocSearch-Help {
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    margin: 0;
    user-select: none;
  }

  .DocSearch-Hits mark {
    ${BRAND_GRADIENT_TEXT_STYLES};
  }

  .DocSearch-HitsFooter {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    display: flex;
    justify-content: center;
  }

  .DocSearch-HitsFooter a {
    padding-top: ${EDGE_SPACING};
    margin-bottom: ${EDGE_SPACING};
    border-bottom: ${BORDER_SIZES.DETAIL} solid;
    color: inherit;
    display: inline-flex;
  }

  .DocSearch-Hit {
    padding-bottom: ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)};
    border-radius: ${BORDER_RADIUSES.BOX};
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
    ${KEY_NAVIGATING_STYLES};
    outline-offset: -${BORDER_SIZES.OUTLINE};
    background-color: ${COLORS.BACKGROUND_CODE};
    padding-left: ${EDGE_SPACING};
    border-radius: ${BORDER_RADIUSES.BOX};
    display: block;
    width: 100%;
  }

  .DocSearch-Hit-source {
    background-color: ${COLORS.BACKGROUND_SITE};
    color: ${COLORS.TEXT_HIGH_CONTRAST};
    margin: 0 -${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)};
    padding: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)}
      ${SPACINGS.CUSTOM(({ ONE }) => ONE - 0.2)} 0;
    font-size: ${FONT_SIZES.COMPLEMENTARY};
    font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
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
      ${BRAND_GRADIENT_BACKGROUND_STYLES};
    }

    &:before {
      width: 0.4rem;
    }
    &:after {
      border-radius: ${BORDER_RADIUSES.BOX};
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
    ${buttonBareStyles};
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
    font-weight: ${FONT_WEIGHTS.MEDIUM};
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
    font-size: ${FONT_SIZES.CUSTOM(
      ({ COMPLEMENTARY }) => COMPLEMENTARY + 0.04
    )};
  }

  .DocSearch-Hit-path {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: ${FONT_SIZES.DETAIL};
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
      padding-top: ${SPACINGS.ONE};
      font-size: ${FONT_SIZES.COMPLEMENTARY};
      display: inline-block;
    }

    li {
      color: ${COLORS.TEXT_HIGH_CONTRAST};
      list-style-position: inside;
      list-style-type: '» ';
      text-align: left;
    }
  }

  .DocSearch-Prefill {
    ${buttonBareStyles};
    ${linkContentStyles};
    padding-top: ${SPACINGS.ONE};
    padding-bottom: ${SPACINGS.ONE};
  }
`

const footerStyles = css`
  .DocSearch-Footer {
    flex: 0 0 auto;
    padding-top: ${EDGE_SPACING};
    display: flex;
    flex-direction: row-reverse;
    flex-shrink: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .DocSearch-Logo a {
    ${KEY_NAVIGATING_STYLES};
    display: flex;
  }

  .DocSearch-Logo svg {
    color: #5468ff;
    margin-left: ${SPACINGS.CUSTOM(({ ONE }) => ONE + 0.2)};
  }

  .DocSearch-Label {
    color: ${COLORS.TEXT_LOW_CONTRAST};
    font-size: ${FONT_SIZES.DETAIL};
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
    border-radius: ${BORDER_RADIUSES.LINE};
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
    ${KEY_NAVIGATING_STYLES};
    height: calc(${INPUT_HEIGHT} - (${INPUT_BORDER_SIZE} * 2));
    padding-left: ${BUTTON_WIDTH};
    padding-right: ${BUTTON_WIDTH};
    -webkit-appearance: none;
    appearance: none;
    border-radius: ${BORDER_RADIUSES.BOX};
    width: 100%;
    font-size: ${FONT_SIZES.H4};
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

  .DocSearch-VisuallyHiddenForAccessibility {
    ${visuallyHiddenStyles};
  }
`

const toggleButtonStyles = css`
  .DocSearch-Button {
    ${searchButtonStyles};

    &:hover {
      box-shadow: none;
    }
  }
  .DocSearch-Button-Placeholder,
  .DocSearch-Button-Keys {
    ${visuallyHiddenStyles}
  }
  .DocSearch-Search-Icon {
    ${searchButtonIconStyles};
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
    ${buttonBareStyles};
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
    ${buttonBareStyles};
    color: ${COLORS.TEXT_BODY};
    height: ${INPUT_HEIGHT};
    display: flex;
    align-items: center;
    margin-left: ${SPACINGS.CUSTOM(({ TWO }) => TWO - 0.2)};
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

const SearchStyles = createGlobalStyle<{ $isKeyNavigating: boolean }>`
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

export const SearchAlgolia = () => {
  const isKeyNavigating = useAppSelector(selectKeyNavigating)
  const isSearchOpen = useAppSelector(selectIsModalOpen(MODALS.SITE_SEARCH))
  const isSearchInitiallyOpenRef = useRef(isSearchOpen)
  const closeSearchRef = useRef<() => void>()
  const toggleElement = useRef<HTMLButtonElement | null>(null)
  const dispatch = useAppDispatch()

  const openSearch = useCallback(() => {
    dispatch(setAllModalsClosed())
    dispatch(setModalOpen(MODALS.SITE_SEARCH))
  }, [dispatch])

  const closeSearch = useCallback(() => {
    dispatch(setModalClosed(MODALS.SITE_SEARCH))
  }, [dispatch])

  useEffect(() => {
    if (!isBrowser || toggleElement.current) return

    toggleElement.current = document.querySelector(
      `.${ALGOLIA_CLASSNAMES.SEARCH_TOGGLE_BUTTON}`
    )

    if (toggleElement.current) {
      toggleElement.current.addEventListener('click', openSearch)
    }

    return () => {
      if (toggleElement.current) {
        toggleElement.current.removeEventListener('click', openSearch)
      }
    }
  }, [openSearch])

  useEffect(() => {
    if (!toggleElement.current || !isSearchInitiallyOpenRef.current) return
    toggleElement.current.click()
  }, [])

  useEffect(() => {
    if (!isBrowser) return
    const { body } = document

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type !== 'attributes') return

        if (!body.classList.contains(ALGOLIA_CLASSNAMES.SEARCH_ACTIVE)) {
          closeSearchRef.current?.()
          return
        }

        const input = body.querySelector(`.${ALGOLIA_CLASSNAMES.SEARCH_INPUT}`)
        if (input) setTimeout(() => (input as HTMLInputElement).focus(), 0)
      })
    })

    observer.observe(body, {
      attributes: true,
      childList: false,
      subtree: false
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    closeSearchRef.current = closeSearch
  }, [closeSearch])

  return (
    <>
      <SearchStyles $isKeyNavigating={isKeyNavigating} />
      <DocSearch
        appId={ALGOLIA_SEARCH_CONFIG.APP_ID}
        indexName={ALGOLIA_SEARCH_CONFIG.INDEX_NAME}
        apiKey={ALGOLIA_SEARCH_CONFIG.API_KEY}
      />
    </>
  )
}
