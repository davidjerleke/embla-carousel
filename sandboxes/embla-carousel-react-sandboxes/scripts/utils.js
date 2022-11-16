import fs from 'fs'

export const EXCLUDE_SANDBOX_FILES = ['createPackageJson.ts']
export const PATH_TO_SANDBOX_FILES = 'src/SandboxFilesDist'
export const COMMENTS_REGEX = /\/\*.+?\*\/|\/\/.*(?=[\n\r])/g
export const EMPTY_LINE_REGEX = /^\s*\n/gm

export const readFiles = (dirname, onFileContent, onError) => {
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
