import { useEffect, PropsWithChildren, useRef } from 'react'
import { createPortal } from 'react-dom'
import { isBrowser } from 'utils/isBrowser'

const getPortalWrapper = (): HTMLElement | null => {
  if (!isBrowser) return null

  let wrapper = document.getElementById(PORTAL_ELEMENT_ID)
  if (wrapper) return wrapper

  wrapper = document.createElement('div')
  wrapper.id = PORTAL_ELEMENT_ID
  document.body.appendChild(wrapper)
  return wrapper
}

const PORTAL_ELEMENT_ID = 'portal-root'

type PropType = PropsWithChildren<{}>

export const Portal = (props: PropType) => {
  const { children } = props
  const portalWrapper = useRef(getPortalWrapper())
  const portalContent = useRef<HTMLDivElement>(
    isBrowser ? document.createElement('div') : null,
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
