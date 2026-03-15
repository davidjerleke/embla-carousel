import { notFound } from 'next/navigation'
import { type MdxContentType } from '@/utils/mdx'
import { GLOBAL_DATA } from '@/utils/global-data'
import { joinSlugs } from '@/utils/slug'
import {
  CONTENT_FOLDER_NAME,
  PAGES_FOLDER_NAME,
  SHARED_FOLDER_NAME
} from '@/utils/content-path'

/* CONSTS */
export const HOME_PAGE_FILE_NAME = 'home.mdx'

/* UTILS */
export async function getHomePageContent(): Promise<MdxContentType> {
  try {
    const module: MdxContentType = await import(
      `@/${CONTENT_FOLDER_NAME}/${SHARED_FOLDER_NAME}/${PAGES_FOLDER_NAME}/${HOME_PAGE_FILE_NAME}`
    )
    return module
  } catch (error) {
    notFound()
  }
}

export async function getHomePageJsonLd(): Promise<string> {
  const { TITLE, DESCRIPTION, HOME_PAGE, URLS, SHARE_IMAGE, MASKABLE_ICON } =
    GLOBAL_DATA

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': joinSlugs(HOME_PAGE, '#software'),
    name: TITLE,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: HOME_PAGE,
    description: DESCRIPTION,
    isAccessibleForFree: true,
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: URLS.GITHUB_ROOT,
    image: SHARE_IMAGE,
    logo: MASKABLE_ICON
  }

  return JSON.stringify(jsonLd)
}
