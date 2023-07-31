import fs from 'fs'

export const CONSOLE_FONT_COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  CYAN: '\x1b[36m%s\x1b[0m'
}

export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const readFiles = (
  dirname: string,
  onFileContent: (filename: string, content: string) => void,
  onError: (error: NodeJS.ErrnoException | null) => void
): void => {
  fs.readdirSync(dirname, { withFileTypes: true }).forEach((entry) => {
    if (entry.isDirectory()) {
      return readFiles(dirname + entry.name + '/', onFileContent, onError)
    }

    fs.readFile(dirname + entry.name, 'utf-8', (error, content) => {
      if (error) return onError(error)
      onFileContent(dirname + entry.name, content)
    })
  })
}
