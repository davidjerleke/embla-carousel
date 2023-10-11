import fs from 'fs'

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
