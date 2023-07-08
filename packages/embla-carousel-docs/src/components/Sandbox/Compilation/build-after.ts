import fs from 'fs'
import {
  readFiles,
  PATHS_TO_SANDBOX_FILES,
  CONSOLE_FONT_COLOR_RED,
  CONSOLE_FONT_COLOR_GREEN
} from './build-utils'

PATHS_TO_SANDBOX_FILES.forEach((path) => {
  try {
    readFiles(
      `${path}/`,
      (filename, content) => {
        fs.writeFile(
          filename,
          content.replace(
            /\/\* The TypeScript compiler won't clear this empty line! \*\//gm,
            ''
          ),
          (error) => {
            if (error) return console.log(error)
          }
        )
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
