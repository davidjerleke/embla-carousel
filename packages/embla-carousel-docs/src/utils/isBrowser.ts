export const isBrowser: boolean = !!(
  typeof window !== 'undefined' && window.document?.createElement
)
