import React from 'react'
import styled from 'styled-components'
import { PlainButton } from 'components/Button'
import { SearchIcon } from 'assets/icons'
import { createSquareSizeStyles } from 'utils'
import { SEARCH_ID } from './Search'
import { useSearch } from 'hooks'
import { LAYERS } from 'consts'

const Wrapper = styled(PlainButton)`
  ${createSquareSizeStyles('4rem')};
  color: var(--text-high-contrast);
  z-index: ${LAYERS.STEP};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
`

export const SearchSvg = styled(SearchIcon)`
  ${createSquareSizeStyles('2.35rem')};
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`

export const SearchToggle = () => {
  const { isOpen, toggleSearch } = useSearch()

  return (
    <Wrapper
      id={SEARCH_ID}
      type="button"
      onClick={toggleSearch}
      aria-label="Open Search Dialog"
      aria-expanded={isOpen}
    >
      <SearchSvg aria-hidden="true" focusable="false" />
    </Wrapper>
  )
}
