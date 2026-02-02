import path from 'path'

/* CONSTS */
export const ROOT_FOLDER_NAME = 'src'
export const CONTENT_FOLDER_NAME = 'content'
export const PAGES_FOLDER_NAME = 'pages'
export const SHARED_FOLDER_NAME = 'shared'

/* UTILS */
export function getContentFolderPath(): string {
  return path.join(process.cwd(), ROOT_FOLDER_NAME, CONTENT_FOLDER_NAME)
}

export function getSharedPageFolderPath(): string {
  return getVersionedPageFolderPath(SHARED_FOLDER_NAME)
}

export function getVersionedPageFolderPath(version: string): string {
  return path.join(getContentFolderPath(), version, PAGES_FOLDER_NAME)
}
