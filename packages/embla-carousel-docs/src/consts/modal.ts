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
