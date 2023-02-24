import React from 'react'
import styled from 'styled-components'
import { BareLink } from 'components/Link/BareLink'
import { COLORS } from 'consts/themes'
import { FONT_SIZES } from 'consts/fontSizes'
import { SPACINGS } from 'consts/spacings'
import { URLS } from 'consts/urls'
import { IconWithText } from 'components/Icon/IconWithText'

const PageEditThisPageWrapper = styled(BareLink)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  padding-top: ${SPACINGS.ONE};
  padding-bottom: ${SPACINGS.ONE};
  margin-top: ${SPACINGS.EIGHT};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

type PropType = {
  pageUrl: string
}

export const PageEditThisPage = (props: PropType) => {
  const { pageUrl } = props
  const url = `${URLS.GITHUB_DOCUMENTATION}/${pageUrl}`

  return (
    <PageEditThisPageWrapper to={url}>
      <IconWithText iconSvg="pen" iconSize="1.5rem">
        Edit this page on GitHub
      </IconWithText>
    </PageEditThisPageWrapper>
  )
}
