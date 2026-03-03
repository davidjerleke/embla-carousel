import path from 'path'
import { arrayHasItems } from '@/utils/array'
import { LATEST_VERSION, VERSION_REGEX } from '@/utils/version'

/* CONSTS */
const LEADING_OR_TRAILING_SLASH_REGEX = /^\/|\/$/g

/* UTILS */
export function pathToSlug(filePath: string): string {
  return filePath.split(path.sep).join('/')
}

export function joinSlugs(base: string, ...slugs: string[]): string {
  const validSlugs = [base, ...slugs]
    .filter(Boolean)
    .map((slug) => slug.replace(LEADING_OR_TRAILING_SLASH_REGEX, ''))

  if (!arrayHasItems(validSlugs)) return base

  return validSlugs.join('/')
}

export function prefixSlugWithDocs(slugOrEmpty: string): string {
  const slug = slugOrEmpty || ''
  if (slug.startsWith('/docs')) return slug
  if (!slug) return '/docs'

  return '/' + joinSlugs('docs', slug)
}

export function getSlugWithVersion(slugOrEmpty?: string[]): string[] {
  const slug = slugOrEmpty || []
  const slugStartsWithVersion = !!slug[0]?.match(VERSION_REGEX)
  return slugStartsWithVersion ? slug : [LATEST_VERSION, ...slug]
}
