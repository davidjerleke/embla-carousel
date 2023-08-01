import fs from 'fs'
import path from 'path'
import { CONSOLE_FONT_COLORS, kebabCaseToPascalCase } from '../utils'

const PACKAGE_NAME_REGEX = /__REPLACE_PACKAGE_NAME__/g
const PACKAGE_AUTHOR_REGEX = /__REPLACE_PACKAGE_AUTHOR__/g

export const createReadme = (template: string, workspace: string): void => {
  const workspacePath = path.join(process.cwd(), workspace)
  const packageJsonPath = `${workspacePath}/package.json`
  const readmePath = `${workspacePath}/README.md`
  const workspacePackageJson = fs.readFileSync(packageJsonPath, 'utf-8')

  if (!workspacePackageJson) return

  const { name, author } = JSON.parse(workspacePackageJson)
  const packageName = name.replace('-monorepo', '')
  const namePascalCase = kebabCaseToPascalCase(packageName, ' ')

  const readme = template
    .replace(PACKAGE_NAME_REGEX, namePascalCase)
    .replace(PACKAGE_AUTHOR_REGEX, author)

  fs.writeFile(readmePath, readme, (error) => {
    if (error) console.log(CONSOLE_FONT_COLORS.RED, error)
  })
}
