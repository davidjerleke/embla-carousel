import React from 'react'
import styled from 'styled-components'
import { PlainLink } from 'components/Link'
import { PenIcon } from 'assets/icons'
import { createSquareSizeStyles } from 'utils'
import { URLS } from 'consts'

const Wrapper = styled(PlainLink)`
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  text-decoration: none;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
  margin-top: 4.8rem;
  color: var(--text-low-contrast);
`

const PenSvg = styled(PenIcon)`
  margin-right: 0.6rem;
  ${createSquareSizeStyles('1.5rem')};
`

type PropType = { pageUrl: string }

export const EditPage = (props: PropType) => {
  const { pageUrl } = props
  const url = `${URLS.DOCUMENTATION_REPOSITORY}/tree/master/${pageUrl}`

  return (
    <Wrapper to={url}>
      <PenSvg aria-hidden="true" focusable="false" />
      <span>Edit this page on GitHub</span>
    </Wrapper>
  )
}
