import React from 'react'
import styled from 'styled-components'
import { PlainLink } from 'components/Link'
import { COLORS, SPACINGS, URLS } from 'consts'
import { IconWithText } from 'components/Icon'

const Wrapper = styled(PlainLink)`
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  text-decoration: none;
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  margin-top: ${SPACINGS.EIGHT};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

type PropType = { pageUrl: string }

export const EditPage = (props: PropType) => {
  const { pageUrl } = props
  const url = `${URLS.GITHUB_DOCUMENTATION}/${pageUrl}`

  return (
    <Wrapper to={url}>
      <IconWithText iconSvg="pen" iconSize="1.5rem">
        Edit this page on GitHub
      </IconWithText>
    </Wrapper>
  )
}
