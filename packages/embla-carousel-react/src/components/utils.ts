export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}
