import fs from 'fs'
import path from 'path'
import { tsCompile } from './ts-compile'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'
import { readFiles } from '../utils/readFiles'
import { copySandboxesFromSrcToDist } from './copy-from-src-to-dist'
import { cleanExistingSandboxDist } from './clean-existing'
import { collectSandboxDistPaths } from './collect-dist-paths'

const SANDBOX_FILES_CONTENT_PATH = path.join(
  process.cwd(),
  'website',
  'src',
  'content'
)
const SANDBOX_FILES_DIST_FOLDER_NAME = 'SandboxFilesDist'
const SANDBOX_FILES_SRC_FOLDER_NAME = 'SandboxFilesSrc'

const EXTENSION_REGEX = {
  DECLARATION: /\.d\.ts$/,
  TSX: /\.tsx$/,
  TS: /\.ts$/
}

function main(): void {
  cleanExistingSandboxDist(
    SANDBOX_FILES_CONTENT_PATH,
    SANDBOX_FILES_DIST_FOLDER_NAME
  )
  copySandboxesFromSrcToDist(
    SANDBOX_FILES_CONTENT_PATH,
    SANDBOX_FILES_SRC_FOLDER_NAME,
    SANDBOX_FILES_DIST_FOLDER_NAME
  )
  const pathsToSandboxFiles = collectSandboxDistPaths(
    SANDBOX_FILES_CONTENT_PATH,
    SANDBOX_FILES_DIST_FOLDER_NAME
  )

  pathsToSandboxFiles.forEach((pathToSandboxFile) => {
    try {
      readFiles(
        `${pathToSandboxFile}/`,
        (filename, fileContent) => {
          if (EXTENSION_REGEX.DECLARATION.test(filename)) {
            return
          }

          if (EXTENSION_REGEX.TS.test(filename)) {
            const jsFilename = filename.replace(EXTENSION_REGEX.TS, '.js')
            const jsContent = tsCompile(fileContent)

            fs.writeFile(jsFilename, jsContent, (error) => {
              if (error) console.log(CONSOLE_FONT_COLORS.ERROR, error)
            })
          }

          if (EXTENSION_REGEX.TSX.test(filename)) {
            const jsFilename = filename.replace(EXTENSION_REGEX.TSX, '.jsx')
            const jsContent = tsCompile(fileContent, { jsx: 1 })

            fs.writeFile(jsFilename, jsContent, (error) => {
              if (error) console.log(CONSOLE_FONT_COLORS.ERROR, error)
            })
          }
        },
        (error) => {
          throw error
        }
      )

      console.log(
        CONSOLE_FONT_COLORS.SUCCESS,
        `SUCCESS: Sandboxes compiled succesfully: ${pathToSandboxFile}.`
      )
    } catch (error) {
      console.log(CONSOLE_FONT_COLORS.ERROR, error)
    }
  })
}

main()
