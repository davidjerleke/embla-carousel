import fs from 'fs'
import path from 'path'
import { tsCompile } from './ts-compile'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'
import { readFiles } from '../utils/readFiles'

const EXTENSION_REGEX = {
  DECLARATION: /\.d\.ts$/,
  TSX: /\.tsx$/,
  TS: /\.ts$/
}

const PATHS_TO_SANDBOX_FILES: string[] = [
  path.join(process.cwd(), 'src/components/Sandbox/Vanilla/SandboxFilesDist'),
  path.join(process.cwd(), 'src/components/Sandbox/React/SandboxFilesDist')
]

PATHS_TO_SANDBOX_FILES.forEach((pathToSandboxFile) => {
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
