import path from 'path'

/* UTILS */
export function pathToSlug(filePath: string): string {
  return filePath.split(path.sep).join('/')
}
