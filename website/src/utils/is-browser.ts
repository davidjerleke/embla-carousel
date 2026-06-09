/* UTILS */
export function isBrowser(): boolean {
  return !!(typeof window !== 'undefined' && window.document?.createElement)
}
