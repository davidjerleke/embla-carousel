import fs from 'fs'
import path from 'path'
import packageJson from '../../package.json'
import { createReadme } from './create-readme'
import { parseNodeParameters } from '../utils/parseNodeParameters'
import { escapeRegExp } from '../utils/escapeRegExp'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'
import { WORKSPACE_FILTERS, forEachWorkspace } from '../utils/forEachWorkspace'
import {
  ContributorsResponseType,
  createContributors
} from './create-contributors'

const REPO_PATH_REGEX = new RegExp(escapeRegExp('git+https://github.com/'))
const REPO_PATH = packageJson.repository.url.replace(REPO_PATH_REGEX, '')

try {
  const { templatePath } = parseNodeParameters()

  if (!templatePath) {
    console.log(
      CONSOLE_FONT_COLORS.ERROR,
      'ERROR: Readme template path not provided.'
    )
    throw new Error()
  }

  const templateFilePath = path.join(process.cwd(), templatePath)
  const template = fs.readFileSync(templateFilePath, 'utf-8')

  fetch(`https://api.github.com/repos/${REPO_PATH}/contributors`)
    .then((response) => response.json())
    .then((contributors?: ContributorsResponseType) => {
      const contributorMarkup = createContributors(contributors)

      createReadme(template, '', contributorMarkup)

      forEachWorkspace(WORKSPACE_FILTERS.PACKAGES, (workspacePath) => {
        createReadme(template, workspacePath, contributorMarkup)
      })

      console.log(
        CONSOLE_FONT_COLORS.SUCCESS,
        `SUCCESS: README.md's created succesfully for all packages.`
      )
    })
    .catch((error) => {
      throw error
    })
} catch (error) {
  console.log(CONSOLE_FONT_COLORS.ERROR, error)
}
