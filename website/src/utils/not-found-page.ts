import { notFound } from 'next/navigation'
import { type MdxContentType } from '@/utils/mdx'
import {
  CONTENT_FOLDER_NAME,
  PAGES_FOLDER_NAME,
  SHARED_FOLDER_NAME
} from '@/utils/content-path'

/* CONSTS */
export const NOT_FOUND_PAGE_FILE_NAME = 'not-found.mdx'

/* UTILS */
export async function getNotFoundPageContent(): Promise<MdxContentType> {
  try {
    const module: MdxContentType = await import(
      `@/${CONTENT_FOLDER_NAME}/${SHARED_FOLDER_NAME}/${PAGES_FOLDER_NAME}/${NOT_FOUND_PAGE_FILE_NAME}`
    )
    return module
  } catch (error) {
    notFound()
  }
}
