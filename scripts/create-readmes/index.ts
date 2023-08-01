import fs from 'fs'
import path from 'path'
import packageJson from '../../package.json'
import { PackageJson as PackageJsonType } from 'type-fest'
import { createReadme } from './create-readme'
import { CONSOLE_FONT_COLORS, parseNodeParameters } from '../utils'

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

  createReadme(template, '')

  WORKSPACES.filter((workspace) =>
    PACKAGES_FOLDER_REGEX.test(workspace)
  ).forEach((workspace) => createReadme(template, workspace))

  console.log(
    CONSOLE_FONT_COLORS.CYAN,
    `SUCCESS: README.md's created succesfully for all packages.`
  )
} catch (error) {
  console.log(CONSOLE_FONT_COLORS.RED, error)
}
