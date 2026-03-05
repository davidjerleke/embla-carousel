/* CONSTS */
const EXTERNAL_LINK_REGEX = /^https?:\/\/|^\/\//

/* UTILS */
export function isInternalLink(href: string): boolean {
  return !isExternalLink(href)
}

export function isExternalLink(href: string): boolean {
  return EXTERNAL_LINK_REGEX.test(href)
}
