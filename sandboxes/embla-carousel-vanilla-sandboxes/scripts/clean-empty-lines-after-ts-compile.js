import fs from 'fs'
import { readFiles, PATH_TO_SANDBOX_FILES } from './utils.js'

readFiles(
  `${PATH_TO_SANDBOX_FILES}/`,
  (filename, content) => {
    fs.writeFile(
      `${PATH_TO_SANDBOX_FILES}/${filename}`,
      content.replace(
        /\/\* The TypeScript compiler won't clear this empty line! \*\//gm,
        '',
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
