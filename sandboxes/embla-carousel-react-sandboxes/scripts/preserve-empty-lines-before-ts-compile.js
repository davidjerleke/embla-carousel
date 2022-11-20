import fs from 'fs'
import { readFiles, PATH_TO_SANDBOX_FILES, EMPTY_LINE_REGEX } from './utils.js'

readFiles(
  `${PATH_TO_SANDBOX_FILES}/`,
  (filename, content) => {
    fs.writeFile(
      `${PATH_TO_SANDBOX_FILES}/${filename}`,
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
