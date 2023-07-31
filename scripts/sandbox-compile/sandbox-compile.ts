import fs from 'fs'
import path from 'path'
import { tsCompile } from './ts-compile'
import {
  readFiles,
  CONSOLE_FONT_COLOR_RED,
  CONSOLE_FONT_COLOR_GREEN
} from '../utils'

const EXTENSION_REGEX = {
  DECLARATION: /.d.ts$/,
  TSX: /.tsx$/,
  TS: /.ts$/
}

const PATHS_TO_SANDBOX_FILES = [
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
          console.log(tsCompile(content))
          console.log('-------------')
        }

        if (EXTENSION_REGEX.TSX.test(filename)) {
          console.log(tsCompile(content, { jsx: 1 }))
          console.log('-------------')
        }

        // fs.writeFile(
        //   filename,
        //   content.replace(
        //     /\/\* The TypeScript compiler won't clear this empty line! \*\//gm,
        //     ''
        //   ),
        //   (error) => {
        //     if (error) return console.log(error)
        //   }
        // )
      },
      (error) => {
        throw error
      }
    )

    console.log(
      CONSOLE_FONT_COLOR_GREEN,
      `Sandboxes created succesfully: ${path}`
    )
  } catch (error) {
    console.log(CONSOLE_FONT_COLOR_RED, error)
  }
})
