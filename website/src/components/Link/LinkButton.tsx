import styled from 'styled-components'
import { buttonPrimaryFilledStyles } from '@/components/Button/ButtonPrimaryFilled'
import { buttonPrimaryOutlinedStyles } from '@/components/Button/ButtonPrimaryOutlined'
import { ButtonBareText } from '@/components/Button/ButtonBare'
import { LinkBare, PropType } from './LinkBare'

const LinkButtonPrimaryFilledWrapper = styled(LinkBare)`
  ${buttonPrimaryFilledStyles};
`

export function LinkButtonPrimaryFilled(props: PropType) {
  const { children, ...restProps } = props

  return (
    <LinkButtonPrimaryFilledWrapper {...restProps}>
      <ButtonBareText>{children}</ButtonBareText>
    </LinkButtonPrimaryFilledWrapper>
  )
}

const LinkButtonPrimaryOutlinedWrapper = styled(LinkBare)`
  ${buttonPrimaryOutlinedStyles};
`

export function LinkButtonPrimaryOutlined(props: PropType) {
  const { children, ...restProps } = props

  return (
    <LinkButtonPrimaryOutlinedWrapper {...restProps}>
      <ButtonBareText>{children}</ButtonBareText>
    </LinkButtonPrimaryOutlinedWrapper>
  )
}
