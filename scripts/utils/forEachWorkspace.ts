import path from 'path'
import packageJson from '../../package.json'
import { PackageJson as PackageJsonType } from 'type-fest'

const WORKSPACES: PackageJsonType['workspaces'] = packageJson?.workspaces || []
export const WORKSPACE_FILTERS = { PACKAGES: /packages\// }

export const forEachWorkspace = (
  filterRegExp: RegExp,
  callback: (workspacePath: string) => void
): void => {
  WORKSPACES.forEach((workspace) => {
    if (!filterRegExp.test(workspace)) return

    const workspacePath = path.join(process.cwd(), workspace)
    callback(workspacePath)
  })
}
