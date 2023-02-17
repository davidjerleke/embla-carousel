import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { COLORS } from 'consts/themes'
import { SPACINGS } from 'consts/spacings'
import { Links } from 'components/Footer/Links'

const SiteNavigationMenuDesktopWrapper = styled.div`
  background-color: ${COLORS.BACKGROUND_SITE};
  position: relative;
  height: 100%;
`

const ScrollArea = styled.ul`
  padding-bottom: ${SPACINGS.FOUR};
  overflow: auto;
  position: relative;
  max-height: 100%;
`

const MiscLinks = styled(Links)`
  padding-top: ${SPACINGS.THREE};
  flex-direction: column;
`

type PropType = PropsWithChildren<{}>

export const SiteNavigationMenuDesktop = (props: PropType) => {
  const { children } = props

  return (
    <SiteNavigationMenuDesktopWrapper>
      <ScrollArea>
        {children}
        <li>
          <MiscLinks />
        </li>
      </ScrollArea>
    </SiteNavigationMenuDesktopWrapper>
  )
}
