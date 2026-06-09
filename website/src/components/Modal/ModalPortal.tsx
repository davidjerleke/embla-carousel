'use client'

import { useEffect, PropsWithChildren, useRef } from 'react'
import { createPortal } from 'react-dom'
import { isBrowser } from '@/utils/is-browser'
import { getExistingOrCreatePortalWrapper } from '@/utils/modal'

type PropType = PropsWithChildren<{}>

export function ModalPortal(props: PropType) {
  const { children } = props
  const portalWrapper = useRef(getExistingOrCreatePortalWrapper())
  const portalContent = useRef<HTMLDivElement>(
    isBrowser() ? document.createElement('div') : null
  )

  useEffect(() => {
    if (!portalWrapper.current || !portalContent.current) return

    portalWrapper.current.appendChild(portalContent.current)

    return () => {
      if (!portalWrapper.current || !portalContent.current) return
      portalWrapper.current.removeChild(portalContent.current)
    }
  }, [])

  return createPortal(children, portalContent.current as HTMLDivElement)
}
