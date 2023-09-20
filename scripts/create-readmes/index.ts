import fs from 'fs'
import path from 'path'
import packageJson from '../../package.json'
import { PackageJson as PackageJsonType } from 'type-fest'
import { createReadme } from './create-readme'
import {
  CONSOLE_FONT_COLORS,
  escapeRegExp,
  parseNodeParameters
} from '../utils'
import {
  ContributorsResponseType,
  createContributors
} from './create-contributors'

const REPO_PATH_REGEX = new RegExp(escapeRegExp('git+https://github.com/'))
const REPO_PATH = packageJson.repository.url.replace(REPO_PATH_REGEX, '')
const PACKAGES_FOLDER_REGEX = /packages\//
const WORKSPACES: PackageJsonType['workspaces'] = packageJson?.workspaces || []

try {
  const { templatePath } = parseNodeParameters()

  if (!templatePath) {
    console.log(
      CONSOLE_FONT_COLORS.RED,
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

      WORKSPACES.forEach((workspace) => {
        if (!PACKAGES_FOLDER_REGEX.test(workspace)) return
        createReadme(template, workspace, contributorMarkup)
      })

      console.log(
        CONSOLE_FONT_COLORS.CYAN,
        `SUCCESS: README.md's created succesfully for all packages.`
      )
    })
    .catch((error) => {
      throw error
    })
} catch (error) {
  console.log(CONSOLE_FONT_COLORS.RED, error)
}
