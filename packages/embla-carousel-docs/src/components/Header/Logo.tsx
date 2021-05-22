import React from 'react'
import styled from 'styled-components'
import { createSquareSizeStyles } from 'utils'
import { useNavigation, useSiteMetadata } from 'hooks'
import { breakpoints, cssHackStyles } from 'consts'
import { PlainLink } from 'components/Link'
import { SiteLogo } from 'components/SiteLogo'

const Wrapper = styled(PlainLink)`
  color: var(--text-high-contrast);
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 1;
  font-weight: 900;
  font-size: 1.8rem;

  ${breakpoints.minXxs} {
    font-size: 2rem;
  }

  ${cssHackStyles.firefoxAll} {
    font-weight: 1000;
  }
`

const LogoWrapper = styled.div`
  ${createSquareSizeStyles('2.8rem')};
  display: flex;
  margin-right: 0.8rem;

  ${breakpoints.minXxs} {
    ${createSquareSizeStyles('3rem')};
  }

  > img {
    ${createSquareSizeStyles('100%')};
  }
`

export const Logo = () => {
  const { closeNavigation } = useNavigation()
  const { title } = useSiteMetadata()

  return (
    <Wrapper
      aria-label="Permalink to home page"
      onClick={closeNavigation}
      to="/"
    >
      <LogoWrapper>
        <SiteLogo />
      </LogoWrapper>
      <span>{title}</span>
    </Wrapper>
  )
}
