import path from 'path'

/* CONSTS */
export const ROOT_FOLDER_NAME = 'src'
export const CONTENT_FOLDER_NAME = 'content'
export const PAGES_FOLDER_NAME = 'pages'
export const SHARED_FOLDER_NAME = 'shared'

/* UTILS */
export function getContentFolderStaticPath(): string {
  return path.join(process.cwd(), ROOT_FOLDER_NAME, CONTENT_FOLDER_NAME)
}

export function getSharedPageFolderStaticPath(): string {
  return getVersionedPageFolderStaticPath(SHARED_FOLDER_NAME)
}

export function getVersionedPageFolderStaticPath(version: string): string {
  return path.join(getContentFolderStaticPath(), version, PAGES_FOLDER_NAME)
}
