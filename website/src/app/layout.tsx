import styled from 'styled-components'
import StyledComponentsRegistry from '@/components/StyledComponents/StyledComponentsRegistry'

const Body = styled.body`
  margin: 0;
  background-color: black;
  color: white;
`

type PropType = {
  children: React.ReactNode
}

export default function RootLayout(props: PropType) {
  const { children } = props

  return (
    <StyledComponentsRegistry>
      <html lang="en">
        <Body>{children}</Body>
      </html>
    </StyledComponentsRegistry>
  )
}
