import path from 'path'
import { arrayHasItems } from '@/utils/array'
import {
  DOCS_LATEST_VERSION,
  DOCS_VERSIONS,
  VersionType
} from '@/utils/global-data'

/* CONSTS */
const SLUG_VERSION_REGEX = /^v\d+$/
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
  const slugStartsWithVersion = !!slug[0]?.match(SLUG_VERSION_REGEX)
  const latestVersionSlug = `v${DOCS_LATEST_VERSION.MAJOR}`
  return slugStartsWithVersion ? slug : [latestVersionSlug, ...slug]
}

export function getVersionFromPathname(pathnameOrEmpty: string): VersionType {
  const pathname = pathnameOrEmpty || ''
  const regex = new RegExp(`${prefixSlugWithDocs('')}\/v\\d+/?`)

  const match = pathname.match(regex)?.[0] || ''
  const slugNoTrailingSlash = match.replace(/\/$/, '')
  const version = DOCS_VERSIONS.find(({ SLUG }) => SLUG === slugNoTrailingSlash)
  return version || DOCS_LATEST_VERSION
}
