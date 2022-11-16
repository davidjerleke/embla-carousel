import fs from 'fs'
import {
  readFiles,
  PATH_TO_SANDBOX_FILES,
  EXCLUDE_SANDBOX_FILES,
  COMMENTS_REGEX,
} from './utils.js'

readFiles(
  `${PATH_TO_SANDBOX_FILES}/`,
  (filename, content) => {
    if (EXCLUDE_SANDBOX_FILES.includes(filename)) return

    fs.writeFile(
      `${PATH_TO_SANDBOX_FILES}/${filename}`,
      content.replace(COMMENTS_REGEX, ''),
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
