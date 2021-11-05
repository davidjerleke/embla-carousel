import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { CrossIcon, SearchIcon } from 'assets/icons'
import { navigate } from '@reach/router'
import { useSearch, useSiteMetadata, useTabAccess } from 'hooks'
import { tabAccessStyles } from 'components/TabAccess'
import { PlainButton } from 'components/Button'
import { algoliaLogoDataURI, ALGOLIA_SEARCH, breakpoints, LAYERS } from 'consts'
import {
  createPlaceholderStyles,
  createSquareSizeStyles,
  createTruncateStyles,
  gradientTextStyles,
  isBrowser,
  visuallyHiddenStyles,
} from 'utils'

const FRAME_BORDER_COLOR = 'var(--background-code)'
const FRAME_BORDER_SIZE = '0.1rem'
const INPUT_BORDER_SIZE = '0.2rem'
const INPUT_HEIGHT = '5.6rem'
const BUTTON_WIDTH = '4.8rem'
const FOOTER_HEIGHT = '3.2rem'
const EDGE_SPACING = '1.2rem'
const FRAME_TOP_OFFSET_DESKTOP = '4rem'
const SCROLL_HEIGHT_COMPACT = `${INPUT_HEIGHT} + (${EDGE_SPACING} * 2) + (${FRAME_BORDER_SIZE} * 2) + ${FOOTER_HEIGHT} + ${EDGE_SPACING}`
const SCROLL_HEIGHT_DESKTOP = `${FRAME_TOP_OFFSET_DESKTOP} + ${SCROLL_HEIGHT_COMPACT}`

const Wrapper = styled.div`
  padding: ${EDGE_SPACING};
  border: ${FRAME_BORDER_SIZE} solid ${FRAME_BORDER_COLOR};
  display: flex;
  align-items: center;
  background-color: var(--background-site);
  position: relative;

  ${breakpoints.desktop} {
    border-radius: 0.4rem;
    margin-top: ${FRAME_TOP_OFFSET_DESKTOP};
  }

  .algolia-autocomplete {
    width: 100%;
  }

  .ds-dropdown-menu {
    padding: ${EDGE_SPACING};
    border: ${FRAME_BORDER_SIZE} solid ${FRAME_BORDER_COLOR};
    top: calc(100% + ${INPUT_BORDER_SIZE}) !important;
    margin-left: calc(
      (${FRAME_BORDER_SIZE} + ${EDGE_SPACING} + ${INPUT_BORDER_SIZE}) * -1
    );
    background-color: var(--background-site);
    border-top-width: 0;
    width: 100vw;

    ${breakpoints.desktop} {
      width: calc(
        100% + (${FRAME_BORDER_SIZE} * 2) + (${EDGE_SPACING} * 2) +
          (${INPUT_BORDER_SIZE} * 2)
      );
      border-bottom-left-radius: 0.4rem;
      border-bottom-right-radius: 0.4rem;
    }
  }

  .ds-suggestions {
    overflow: auto;
    margin-top: -0.6rem;
    max-height: calc(100vh - (${SCROLL_HEIGHT_COMPACT}));

    ${breakpoints.desktop} {
      max-height: calc(100vh - (${SCROLL_HEIGHT_DESKTOP}));
    }
  }

  .ds-suggestion {
    margin-top: 0.6rem;
  }

  .algolia-docsearch-suggestion {
    text-decoration: none;
    display: block;
    border-radius: 0.4rem;
    -webkit-tap-highlight-color: rgba(var(--text-high-contrast-rgb-value), 0.5);
  }

  .algolia-docsearch-suggestion--highlight {
    ${gradientTextStyles};
  }

  .algolia-docsearch-suggestion--subcategory-column-text {
    color: var(--text-low-contrast);
  }

  .algolia-docsearch-suggestion--content {
    height: ${INPUT_HEIGHT};
    position: relative;
    background-color: var(--background-code);
    padding-right: 1.8rem;
    padding-left: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    &:before,
    &:after {
      content: '';
      position: absolute;
      pointer-events: none;
      top: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      background-image: linear-gradient(
        45deg,
        var(--brand-primary),
        var(--brand-secondary)
      );
    }

    &:after {
      border-radius: 0.4rem;
      right: 0;
    }

    &:before {
      width: 0.4rem;
    }

    @media (hover: none), (hover: on-demand) {
      &:hover {
        &:after {
          opacity: 0;
        }
        &:before {
          opacity: 0;
        }
      }
    }
  }

  .ds-suggestion.ds-cursor .algolia-docsearch-suggestion--content {
    &:after {
      opacity: 0.07;
    }
    &:before {
      opacity: 1;
    }
  }

  .algolia-docsearch-suggestion--title {
    ${createTruncateStyles()};
    width: 100%;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-high-contrast);
  }

  .algolia-docsearch-suggestion--text {
    ${createTruncateStyles()};
    color: var(--text-low-contrast);
    font-size: 1.2rem;
  }

  .algolia-docsearch-suggestion--no-results {
    background-color: transparent;
    height: auto;
    padding: 0;
    text-align: center;
    &:before,
    &:after {
      display: none;
    }
  }

  .algolia-docsearch-suggestion--no-results
    .algolia-docsearch-suggestion--text {
    font-size: 1.6rem;
  }

  .algolia-docsearch-suggestion--text .algolia-docsearch-suggestion--highlight {
    font-weight: 500;
  }

  .aa-suggestion-title-separator {
    color: var(--text-low-contrast);
  }

  .algolia-docsearch-suggestion--subcategory-column,
  .algolia-docsearch-suggestion--subcategory-inline,
  .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
    ${visuallyHiddenStyles};
  }

  .algolia-docsearch-footer {
    padding-top: 1.2rem;
    display: flex;
    font-size: 0;
    height: ${FOOTER_HEIGHT};
    align-items: flex-end;
    justify-content: flex-end;
  }

  .algolia-autocomplete .algolia-docsearch-footer--logo {
    background-image: url(${`"${algoliaLogoDataURI}"`});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    overflow: hidden;
    text-indent: -9000px;
    padding: 0 !important;
    width: 100%;
    height: 2rem;
    width: 14rem;
    display: block;
  }
`

const SearchBorder = styled.div`
  padding: ${INPUT_BORDER_SIZE};
  position: relative;
  width: 100%;
  border-radius: 0.4rem;
  background-image: linear-gradient(
    45deg,
    var(--brand-primary),
    var(--brand-secondary)
  );
`

const SearchInput = styled.input<{ $isTabbing: boolean }>`
  ${createPlaceholderStyles('var(--text-low-contrast)')};
  ${tabAccessStyles};
  height: calc(${INPUT_HEIGHT} - (${INPUT_BORDER_SIZE} * 2));
  padding-left: ${BUTTON_WIDTH};
  padding-right: ${BUTTON_WIDTH};
  -webkit-appearance: none;
  width: 100%;

  font-size: 1.8rem;
  background-color: var(--background-site);
  color: var(--text-body);
  border: 0;
`

const SearchButton = styled(PlainButton)`
  width: ${BUTTON_WIDTH};
  top: ${INPUT_BORDER_SIZE};
  bottom: ${INPUT_BORDER_SIZE};
  position: absolute;

  > svg {
    z-index: ${LAYERS.STEP};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-body);
  }
`

const SearchButtonClose = styled(PlainButton)`
  color: var(--text-body);
  padding-left: 1rem;
  display: flex;
  align-items: center;
  height: 5.6rem;

  ${breakpoints.desktop} {
    display: none;
  }
`

const SearchButtonSubmit = styled(SearchButton)`
  left: ${INPUT_BORDER_SIZE};
  pointer-events: none;
`

const SearchButtonReset = styled(SearchButton)`
  right: ${INPUT_BORDER_SIZE};
`

const SearchButtonSubmitSvg = styled(SearchIcon)`
  ${createSquareSizeStyles('2.4rem')};
`

const SearchButtonResetSvg = styled(CrossIcon)`
  ${createSquareSizeStyles('2rem')};
`

export const Input = () => {
  const { siteUrl } = useSiteMetadata()
  const { isOpen, closeSearch } = useSearch()
  const isTabbing = useTabAccess()
  const closeSearchRef = useRef(closeSearch)
  const [value, setValue] = useState('')

  const setInputValue = useCallback(
    (newValue: string) => {
      if (!window.__DOCSEARCH__) return
      window.__DOCSEARCH__.input.autocomplete.setVal(newValue)
      setValue(window.__DOCSEARCH__.input.autocomplete.getVal())
    },
    [setValue],
  )

  const clearInputValue = useCallback(() => {
    if (!window.__DOCSEARCH__) return
    setInputValue('')
    window.__DOCSEARCH__.input.autocomplete.close()
  }, [setInputValue])

  const onInput = useCallback(
    ({ target }) => {
      const element = target as HTMLInputElement
      setValue(element.value || '')
    },
    [setValue],
  )

  useEffect(() => {
    if (!isBrowser || window.__DOCSEARCH__) return

    window.__DOCSEARCH__ = window.docsearch({
      apiKey: ALGOLIA_SEARCH.API_KEY,
      indexName: ALGOLIA_SEARCH.INDEX_NAME,
      inputSelector: `.${ALGOLIA_SEARCH.INPUT_SELECTOR}`,
      debug: false,
      enhancedSearchInput: false,
      handleSelected: (input, event, suggestion) => {
        const relativePath = suggestion.url
          .replace(siteUrl, '')
          .replace('#gatsby-focus-wrapper', '')
        navigate(relativePath)
        closeSearchRef.current()
      },
    })
    window.__DOCSEARCH__.input[0].addEventListener('blur', ({ target }) => {
      const element = target as HTMLInputElement
      if (element.value) window.__DOCSEARCH__.input.autocomplete.open()
    })
  }, [setValue, closeSearch])

  useEffect(() => {
    if (!window.__DOCSEARCH__) return
    if (isOpen) window.__DOCSEARCH__.input[0].focus()
    else clearInputValue()
  }, [isOpen, clearInputValue])

  useEffect(() => {
    closeSearchRef.current = closeSearch
  }, [closeSearch])

  return (
    <Wrapper>
      <SearchBorder>
        <SearchButtonSubmit>
          <SearchButtonSubmitSvg aria-hidden="true" focusable="false" />
        </SearchButtonSubmit>
        <SearchInput
          onInput={onInput}
          type="text"
          placeholder="Search docs"
          className={ALGOLIA_SEARCH.INPUT_SELECTOR}
          $isTabbing={isTabbing}
        />
        {value && (
          <SearchButtonReset onClick={clearInputValue}>
            <SearchButtonResetSvg aria-hidden="true" focusable="false" />
          </SearchButtonReset>
        )}
      </SearchBorder>
      <SearchButtonClose onClick={closeSearch} aria-label="Close Search Dialog">
        Close
      </SearchButtonClose>
    </Wrapper>
  )
}
