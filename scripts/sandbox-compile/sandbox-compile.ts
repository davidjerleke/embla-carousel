import fs from 'fs'
import path from 'path'
import { tsCompile } from './ts-compile'
import { readFiles, CONSOLE_FONT_COLORS } from '../utils'

const EXTENSION_REGEX = {
  DECLARATION: /\.d\.ts$/,
  TSX: /\.tsx$/,
  TS: /\.ts$/
}

const PATHS_TO_SANDBOX_FILES: string[] = [
  path.join(process.cwd(), 'src/components/Sandbox/Vanilla/SandboxFilesDist'),
  path.join(process.cwd(), 'src/components/Sandbox/React/SandboxFilesDist')
]

PATHS_TO_SANDBOX_FILES.forEach((path) => {
  try {
    readFiles(
      `${path}/`,
      (filename, content) => {
        if (EXTENSION_REGEX.DECLARATION.test(filename)) {
          return
        }

        if (EXTENSION_REGEX.TS.test(filename)) {
          const jsFilename = filename.replace(EXTENSION_REGEX.TS, '.js')
          const jsContent = tsCompile(content)

          fs.writeFile(jsFilename, jsContent, (error) => {
            if (error) return console.log(CONSOLE_FONT_COLORS.RED, error)
          })
        }

        if (EXTENSION_REGEX.TSX.test(filename)) {
          const jsFilename = filename.replace(EXTENSION_REGEX.TSX, '.jsx')
          const jsContent = tsCompile(content, { jsx: 1 })

          fs.writeFile(jsFilename, jsContent, (error) => {
            if (error) return console.log(CONSOLE_FONT_COLORS.RED, error)
          })
        }
      },
      (error) => {
        throw error
      }
    )

    console.log(
      CONSOLE_FONT_COLORS.CYAN,
      `Sandboxes created succesfully: ${path}`
    )
  } catch (error) {
    console.log(CONSOLE_FONT_COLORS.RED, error)
  }
})
