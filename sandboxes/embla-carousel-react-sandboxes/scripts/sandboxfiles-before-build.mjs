import fs from 'fs'
import {
  readFiles,
  PATHS_TO_SANDBOX_FILES,
  EMPTY_LINE_REGEX,
} from './sandboxfiles-utils.mjs'

PATHS_TO_SANDBOX_FILES.forEach((path) => {
  readFiles(
    `${path}/`,
    (filename, content) => {
      fs.writeFile(
        `${path}/${filename}`,
        content.replace(
          EMPTY_LINE_REGEX,
          `/* The TypeScript compiler won't clear this empty line! */ \n`,
        ),
        (error) => {
          if (error) return console.log(error)
          console.log('The file was saved!')
        },
      )
    },
    (error) => {
      throw error
    },
  )
})
