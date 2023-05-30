import React from 'react'
import { LinkContent } from 'components/Link/LinkContent'
import { URLS } from 'consts/urls'

export const CarouselGeneratorSupport = () => {
  return (
    <ul>
      <li>
        <LinkContent to={URLS.DONATE_PAYPAL}>PayPal</LinkContent>
      </li>
      <li>
        <LinkContent to={URLS.DONATE_KO_FI}>Ko-fi</LinkContent>
      </li>
    </ul>
  )
}
