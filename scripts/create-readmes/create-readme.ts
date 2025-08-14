import fs from 'fs'
import path from 'path'
import { kebabCaseToPascalCase } from '../utils/kebabCaseToPascalCase'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'

const PACKAGE_NAME_PASCAL_REGEX = /__REPLACE_PACKAGE_PASCAL_NAME__/g
const PACKAGE_NAME_REGEX = /__REPLACE_PACKAGE_NAME__/g
const PACKAGE_AUTHOR_REGEX = /__REPLACE_PACKAGE_AUTHOR__/g
const CONTRIBUTORS_REGEX = /__REPLACE_CONTRIBUTORS__/g
const SPONSORS_CURRENT_REGEX = /__REPLACE_CURRENT_SPONSORS__/g
const SPONSORS_PAST_REGEX = /__REPLACE_PAST_SPONSORS__/g

export const createReadme = (
  template: string,
  workspacePath: string,
  contributors: string,
  currentSponsors: string,
  pastSponsors: string
): void => {
  const packageJsonPath = path.join(workspacePath, 'package.json')
  const readmePath = path.join(workspacePath, 'README.md')
  const workspacePackageJson = fs.readFileSync(packageJsonPath, 'utf-8')

  if (!workspacePackageJson) return

  const { name, author } = JSON.parse(workspacePackageJson)
  const packageName = name.replace('-monorepo', '')
  const packageNamePascal = kebabCaseToPascalCase(packageName, ' ')

  const readme = template
    .replace(PACKAGE_NAME_REGEX, packageName)
    .replace(PACKAGE_NAME_PASCAL_REGEX, packageNamePascal)
    .replace(PACKAGE_AUTHOR_REGEX, author)
    .replace(CONTRIBUTORS_REGEX, contributors)
    .replace(SPONSORS_CURRENT_REGEX, currentSponsors)
    .replace(SPONSORS_PAST_REGEX, pastSponsors)

  fs.writeFile(readmePath, readme, (error) => {
    if (error) console.log(CONSOLE_FONT_COLORS.ERROR, error)
  })
}
