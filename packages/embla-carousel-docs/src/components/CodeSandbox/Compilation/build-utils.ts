import fs from 'fs'

export const PATHS_TO_SANDBOX_FILES = [
  'src/components/CodeSandbox/Vanilla/SandboxFilesDist',
  'src/components/CodeSandbox/React/SandboxFilesDist',
]

export const EMPTY_LINE_REGEX = /^\s*\n/gm
export const CONSOLE_FONT_COLOR_RED = '\x1b[31m'
export const CONSOLE_FONT_COLOR_GREEN = '\x1b[32m'
export const CONSOLE_FONT_COLOR_CYAN = '\x1b[36m%s\x1b[0m'

export const readFiles = (
  dirname: string,
  onFileContent: (filename: string, content: string) => void,
  onError: (error: NodeJS.ErrnoException | null) => void,
) => {
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
