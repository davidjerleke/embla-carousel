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
  fs.readdir(dirname, (error, filenames) => {
    if (error) return onError(error)

    filenames.forEach((filename) => {
      fs.readFile(dirname + filename, 'utf-8', (error, content) => {
        if (error) return onError(error)
        onFileContent(filename, content)
      })
    })
  })
}
