import fs from 'fs'
import {
  readFiles,
  PATHS_TO_SANDBOX_FILES,
  EMPTY_LINE_REGEX,
  CONSOLE_FONT_COLOR_RED,
  CONSOLE_FONT_COLOR_CYAN,
} from './build-utils'

PATHS_TO_SANDBOX_FILES.forEach((path) => {
  console.log(CONSOLE_FONT_COLOR_CYAN, `Compiling sandboxes: ${path} ...`)

  try {
    readFiles(
      `${path}/`,
      (filename, content) => {
        fs.writeFile(
          filename,
          content.replace(
            EMPTY_LINE_REGEX,
            `/* The TypeScript compiler won't clear this empty line! */ \n`,
          ),
          (error) => {
            if (error) return console.log(error)
          },
        )
      },
      (error) => {
        throw error
      },
    )
  } catch (error) {
    console.log(CONSOLE_FONT_COLOR_RED, error)
  }
})
