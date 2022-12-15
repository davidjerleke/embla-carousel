// import React from 'react'
// import styled from 'styled-components'
// import { BareButton } from 'components/Button/BareButton'
// import { primaryButtonFilledStyles } from 'components/Button/PrimaryButtonFilled'
// import { createSquareSizeStyles } from 'utils/createSquareSizeStyles'
// import { useNavigation } from 'hooks/useNavigation'
// import { Icon } from 'components/Icon/Icon'
// import { COLORS } from 'consts/themes'
// import { SPACINGS } from 'consts/spacings'

// const BUTTON_SIZE = '4rem'
// const BACKGROUND_SIZE = '3rem'

// const Wrapper = styled(BareButton)`
//   ${createSquareSizeStyles(BUTTON_SIZE)};
//   color: ${COLORS.TEXT_HIGH_CONTRAST};
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: calc((${BUTTON_SIZE} - ${BACKGROUND_SIZE}) / 2 * -1);
//   margin-right: calc((${BUTTON_SIZE} - ${BACKGROUND_SIZE}) / 2 * -1);
// `

// const Background = styled.div`
//   ${createSquareSizeStyles(BACKGROUND_SIZE)};
//   ${primaryButtonFilledStyles};
//   padding: 0;
// `

// const CloseSvg = styled(Icon)`
//   position: absolute;
//   transform: translate(-50%, -50%);
//   top: 50%;
//   left: 50%;
// `

// export const NavigationClose = () => {
//   const { closeNavigation } = useNavigation()

//   return (
//     <Wrapper
//       type="button"
//       onClick={closeNavigation}
//       aria-label="Close Main Navigation Menu"
//     >
//       <Background>
//         <CloseSvg svg="cross" size={SPACINGS.THREE} />
//       </Background>
//     </Wrapper>
//   )
// }
export {}
