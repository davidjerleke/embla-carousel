import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { LATEST_VERSION } from '@/utils/version'
import { getMetadataFromMdxContent, MdxContentType } from '@/utils/mdx'
import { GLOBAL_DATA } from '@/utils/global-data'
import { getSlugWithVersion, joinSlugs, prefixSlugWithDocs } from '@/utils/slug'
import {
  CONTENT_FOLDER_NAME,
  getVersionedPageFolderStaticPath,
  PAGES_FOLDER_NAME
} from '@/utils/content-path'

/* CONSTS */
export type DocsPageParamsType = {
  params: Promise<{
    slug?: string[]
  }>
}

/* UTILS */
export async function getDocsPageFileStaticPath(
  slugOrEmpty?: string[]
): Promise<string> {
  const slug = slugOrEmpty || []
  const slugWithVersion = getSlugWithVersion(slug)
  const slugIsLatestVersion = slug[0] === LATEST_VERSION

  if (slugIsLatestVersion) {
    return ''
  }

  const version = slugWithVersion[0]
  const basePath = getVersionedPageFolderStaticPath(version)

  let filePath = ''

  if (slugWithVersion.length === 1) {
    filePath = path.join(basePath, 'index.mdx')
  } else {
    const fileToFind = slugWithVersion.slice(1).join(path.sep)
    const mdxFile = path.join(basePath, `${fileToFind}.mdx`)
    const indexFile = path.join(basePath, fileToFind, 'index.mdx')

    const doesMdxFileExist = fs.existsSync(mdxFile)
    const doesIndexFileExist = !doesMdxFileExist && fs.existsSync(indexFile)

    if (doesMdxFileExist) {
      filePath = mdxFile
    }
    if (doesIndexFileExist) {
      filePath = indexFile
    }
  }

  return filePath
}

export async function getDocsPageContent(
  slugOrEmpty?: string[]
): Promise<MdxContentType> {
  const slug = slugOrEmpty || []
  const slugWithVersion = getSlugWithVersion(slug)
  const version = slugWithVersion[0]
  const fileToFind = slugWithVersion.slice(1).join('/')

  try {
    if (fileToFind) {
      const module: MdxContentType = await import(
        `@/${CONTENT_FOLDER_NAME}/${version}/${PAGES_FOLDER_NAME}/${fileToFind}/index.mdx`
      )
      return module
    }

    const module: MdxContentType = await import(
      `@/${CONTENT_FOLDER_NAME}/${version}/${PAGES_FOLDER_NAME}/index.mdx`
    )
    return module
  } catch (error) {
    try {
      const module: MdxContentType = await import(
        `@/${CONTENT_FOLDER_NAME}/${version}/${PAGES_FOLDER_NAME}/${fileToFind}.mdx`
      )
      return module
    } catch (error) {
      notFound()
    }
  }
}

export async function getDocsPageJsonLd(
  slugOrEmpty?: string[]
): Promise<string> {
  const slug = slugOrEmpty || []
  const { TITLE, HOME_PAGE, URLS, AUTHOR, SHARE_IMAGE, MASKABLE_ICON } =
    GLOBAL_DATA
  const module = await getDocsPageContent(slug)
  const metadata = getMetadataFromMdxContent(module)
  const pageSlug = prefixSlugWithDocs(joinSlugs('', ...slug))
  const pageUrl = joinSlugs(HOME_PAGE, pageSlug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': joinSlugs(pageUrl, '#article'),
    headline: metadata.title,
    description: metadata.description,
    url: pageUrl,
    codeRepository: URLS.GITHUB_ROOT,
    image: SHARE_IMAGE,
    logo: MASKABLE_ICON,
    author: {
      '@type': 'Person',
      name: AUTHOR
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    },
    about: {
      '@type': 'SoftwareApplication',
      name: TITLE
    }
  }

  return JSON.stringify(jsonLd)
}
