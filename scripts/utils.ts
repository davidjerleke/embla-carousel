import fs from 'fs'

export const CONSOLE_FONT_COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  CYAN: '\x1b[36m%s\x1b[0m'
}

export const kebabCaseToPascalCase = (
  string: string = '',
  separator: string = ''
): string => {
  return string.replace(/(^\w|-\w)/g, (replaceString) =>
    replaceString.replace(/-/, separator).toUpperCase()
  )
}

export const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const parseNodeParameters = (): { [key: string]: string } => {
  return process.argv
    .slice(2)
    .filter((arg) => /^--/.test(arg))
    .reduce((args, arg) => {
      const [key, value] = arg.replace(/^--/, '').split('=')
      return { ...args, [key]: value }
    }, {})
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
