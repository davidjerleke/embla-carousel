import { isBrowser } from '@/utils/is-browser'

/* CONSTS */
type EditCodeModalIdType = `${typeof EDIT_CODE_MODAL_ID_PREFIX}${string}`

export type ModalsType =
  | (typeof MODALS)[keyof typeof MODALS]
  | EditCodeModalIdType

export const MODALS = {
  MAIN_NAVIGATION: 'main-navigation',
  SIDEBAR_NAVIGATION: 'sidebar-navigation',
  SITE_SEARCH: 'site-search',
  EDIT_CODE: (id: string): EditCodeModalIdType => {
    return `${EDIT_CODE_MODAL_ID_PREFIX}${id}`
  }
} as const

const EDIT_CODE_MODAL_ID_PREFIX = 'edit-code-'

export const MODAL_CLOSE_KEYS = ['Escape', 'Esc']

export const MODAL_SEARCH_TOGGLE_KEYS_1 = ['Control', 'k']
export const MODAL_SEARCH_TOGGLE_KEYS_2 = ['Meta', 'k']

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
