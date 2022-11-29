import fs from 'fs'
import { readFiles, PATHS_TO_SANDBOX_FILES } from './build-utils'

PATHS_TO_SANDBOX_FILES.forEach((path) => {
  readFiles(
    `${path}/`,
    (filename, content) => {
      fs.writeFile(
        `${path}/${filename}`,
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
})
