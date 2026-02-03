import { isBrowser } from './is-browser'

/* CONSTS */
export type ModalsType =
  | ModalListType['SITE_NAVIGATION']
  | ModalListType['SITE_SEARCH']
  | ReturnType<ModalListType['EDIT_CODE']>

type ModalListType = {
  SITE_NAVIGATION: 'site-navigation'
  SITE_SEARCH: 'site-search'
  EDIT_CODE: (id: string) => `edit-code-${string}`
}

export const MODALS: ModalListType = {
  SITE_NAVIGATION: 'site-navigation',
  SITE_SEARCH: 'site-search',
  EDIT_CODE: (id: string) => `edit-code-${id}`
}

const PORTAL_ELEMENT_ID = 'portal-root'

/* UTILS */
export function getExistingOrCreatePortalWrapper(): HTMLElement | null {
  if (!isBrowser()) return null

  let wrapper = document.getElementById(PORTAL_ELEMENT_ID)
  if (wrapper) return wrapper

  wrapper = document.createElement('div')
  wrapper.id = PORTAL_ELEMENT_ID
  document.body.appendChild(wrapper)
  return wrapper
}
