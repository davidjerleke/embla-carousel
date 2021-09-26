import React, { useCallback, useEffect, useState } from 'react'
import FocusTrap from 'focus-trap-react'
import styled, { css } from 'styled-components'
import { useEventListener, useSearch } from 'hooks'
import { breakpoints, LAYERS, URLS } from 'consts'
import { Input } from './Input'
import { isBrowser } from 'utils'

export const SEARCH_ID = 'site_search'
const DIALOG_MAX_WIDTH = '56rem'

const Wrapper = styled.div<{ $isOpen: boolean }>`
  z-index: ${LAYERS.SEARCH};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${({ $isOpen }) => css`
    transform: ${!$isOpen && 'translateX(-100%)'};
    visibility: ${!$isOpen && 'hidden'};
  `};
`

const Overlay = styled.div`
  background-color: var(--background-site);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.9;
`

const SearchDialog = styled.div`
  z-index: ${LAYERS.STEP};
  position: relative;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  ${breakpoints.minSm} {
    max-width: ${DIALOG_MAX_WIDTH};
  }
`

export const Search = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const { isOpen, closeSearch } = useSearch()

  const onKeyUp = useCallback(
    ({ keyCode }) => {
      if (keyCode === 27) closeSearch()
    },
    [closeSearch],
  )

  useEventListener({
    type: 'keyup',
    listener: onKeyUp,
  })

  useEffect(() => {
    if (!isBrowser) return
    const script = document.createElement('script')
    script.src = URLS.ALGOLIA_DOCSEARCH
    script.async = true
    document.body.appendChild(script)
    script.addEventListener('load', () => setScriptLoaded(true))
  }, [])

  return (
    <FocusTrap active={isOpen}>
      <Wrapper
        $isOpen={isOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby={SEARCH_ID}
        aria-label="Search Dialog"
      >
        <Overlay onPointerUp={closeSearch} />
        <SearchDialog>{scriptLoaded && <Input />}</SearchDialog>
      </Wrapper>
    </FocusTrap>
  )
}
