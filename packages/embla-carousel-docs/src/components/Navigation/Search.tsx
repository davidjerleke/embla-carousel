import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ALGOLIA_SEARCH, LAYERS } from 'consts'
import { SearchIcon } from 'assets/icons'
import {
  createSquareSizeStyles,
  gradientTextStyles,
  isBrowser,
  visuallyHiddenStyles,
} from 'utils'
import { useTabAccess } from 'hooks'
import { tabAccessStyles } from 'components/TabAccess'

const BORDER_COLOR = 'var(--detail-high-contrast)'

const Wrapper = styled.div`
  background-color: var(--background-site);
  border: 0.1rem solid ${BORDER_COLOR};
  border-radius: 10rem;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2.4rem;
  font-size: 1.4rem;

  .algolia-autocomplete {
    width: 100%;
  }

  .algolia-autocomplete .ds-dropdown-menu {
    padding: 1.2rem 2rem;
    width: 50rem;
    background-color: var(--background-site);
    border: 0.1rem solid ${BORDER_COLOR};
    margin-left: -0.1rem;
    border-radius: 0.4rem;
    margin-top: 0.8rem;

    &:before {
      position: absolute;
      left: 3.6rem;
      bottom: 100%;
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-left: 1.2rem solid transparent;
      border-right: 1.2rem solid transparent;
      border-bottom: 1.2rem solid ${BORDER_COLOR};
    }
    &:after {
      position: absolute;
      left: 3.8rem;
      bottom: 100%;
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-bottom: 1rem solid var(--background-site);
    }
  }

  .algolia-docsearch-suggestion {
    text-decoration: none;
  }

  .algolia-docsearch-suggestion--wrapper {
    display: flex;
  }

  .algolia-docsearch-suggestion--subcategory-inline {
    ${visuallyHiddenStyles};
  }

  .algolia-docsearch-suggestion--highlight {
    ${gradientTextStyles};
  }

  .algolia-docsearch-suggestion--subcategory-column-text
    .algolia-docsearch-suggestion--highlight,
  .algolia-docsearch-suggestion--text .algolia-docsearch-suggestion--highlight {
    font-weight: 500;
  }

  .algolia-docsearch-suggestion--subcategory-column {
    padding-right: 1.2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    text-align: right;
    flex: 0 0 15rem;
    border-right: 0.1rem solid ${BORDER_COLOR};
  }

  .algolia-docsearch-suggestion--subcategory-column-text {
    color: var(--text-low-contrast);
  }

  .algolia-docsearch-suggestion--content {
    position: relative;
    padding-left: 1.2rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    width: 100%;

    &:before {
      z-index: ${LAYERS.STEP};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      content: '';
      opacity: 0;
      pointer-events: none;
      background-image: linear-gradient(
        45deg,
        var(--brand-primary),
        var(--brand-secondary)
      );
    }
  }

  .algolia-docsearch-suggestion--content.algolia-docsearch-suggestion--no-results {
    padding-left: 0;
  }

  .algolia-docsearch-suggestion--title {
    font-weight: bold;
    color: var(--text-high-contrast);
  }

  .algolia-docsearch-suggestion--text {
    color: var(--text-low-contrast);
    font-size: 1.2rem;
  }

  .algolia-docsearch-suggestion--wrapper {
    margin-top: 1rem;

    &:hover {
      .algolia-docsearch-suggestion--content:before {
        opacity: 0.2;
      }
    }

    @media (hover: none), (hover: on-demand) {
      &:hover {
        .algolia-docsearch-suggestion--content:before {
          opacity: 0;
        }
      }
    }
  }

  .algolia-autocomplete .algolia-docsearch-suggestion--category-header {
    display: none;
  }

  .algolia-autocomplete
    .algolia-docsearch-suggestion.algolia-docsearch-suggestion__main
    .algolia-docsearch-suggestion--category-header {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-body);
    border-bottom: 0.1rem solid ${BORDER_COLOR};
  }

  .algolia-docsearch-footer {
    margin-top: 1rem;
    text-align: right;
  }
`

const SearchSvg = styled(SearchIcon)`
  ${createSquareSizeStyles('2rem')};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.6rem;
  color: ${BORDER_COLOR};
`

const Input = styled.input<{ $isTabbing: boolean }>`
  ${tabAccessStyles};
  width: 100%;
  height: 3.6rem;
  line-height: 3.6rem;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  color: var(--text-body);
  padding-left: 3.6rem;

  ::-webkit-input-placeholder {
    color: var(--text-low-contrast);
  }
  :-moz-placeholder {
    color: var(--text-low-contrast);
    opacity: 1;
  }
  ::-moz-placeholder {
    color: var(--text-low-contrast);
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: var(--text-low-contrast);
  }
  ::-ms-input-placeholder {
    color: var(--text-low-contrast);
  }

  ::placeholder {
    color: var(--text-low-contrast);
  }
`

export const Search = () => {
  const isTabbing = useTabAccess()

  useEffect(() => {
    if (isBrowser) {
      window.docsearch({
        apiKey: ALGOLIA_SEARCH.API_KEY,
        indexName: ALGOLIA_SEARCH.INDEX_NAME,
        inputSelector: `.${ALGOLIA_SEARCH.INPUT_SELECTOR}`,
        debug: true,
      })
    }
  }, [])

  return (
    <Wrapper>
      <SearchSvg aria-hidden="true" focusable="false" />
      <Input
        type="text"
        $isTabbing={isTabbing}
        className={ALGOLIA_SEARCH.INPUT_SELECTOR}
        placeholder="Search..."
      />
    </Wrapper>
  )
}
