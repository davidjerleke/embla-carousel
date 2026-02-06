import path from 'path'

/* CONSTS */
const ROOT_FOLDER_NAME = 'src'
const CONTENT_FOLDER_NAME = 'content'
const PAGES_FOLDER_NAME = 'pages'
const SHARED_FOLDER_NAME = 'shared'

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
