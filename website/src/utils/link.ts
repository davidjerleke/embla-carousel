/* CONSTS */
const INTERNAL_LINK_REGEX = /^\/(?!\/)|^#/

/* UTILS */
export function isInternalLink(href: string): boolean {
  return INTERNAL_LINK_REGEX.test(href)
}
