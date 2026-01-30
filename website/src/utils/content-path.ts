import path from 'path'
import {
  ROOT_FOLDER_NAME,
  CONTENT_FOLDER_NAME,
  PAGES_FOLDER_NAME,
  SHARED_FOLDER_NAME
} from '@/consts/content-path'

export function getContentFolderPath(): string {
  return path.join(process.cwd(), ROOT_FOLDER_NAME, CONTENT_FOLDER_NAME)
}

export function getHomePageFolderPath(): string {
  return getVersionedPageFolderPath(SHARED_FOLDER_NAME)
}

export function getVersionedPageFolderPath(version: string): string {
  return path.join(getContentFolderPath(), version, PAGES_FOLDER_NAME)
}
