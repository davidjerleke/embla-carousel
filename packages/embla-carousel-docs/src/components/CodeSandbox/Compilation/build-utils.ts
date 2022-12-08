import fs from 'fs'

export const PATHS_TO_SANDBOX_FILES = [
  'src/components/CodeSandbox/Vanilla/SandboxFilesDist',
  'src/components/CodeSandbox/React/SandboxFilesDist',
]

export const EMPTY_LINE_REGEX = /^\s*\n/gm

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
