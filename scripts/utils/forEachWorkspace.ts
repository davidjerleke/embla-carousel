import path from 'path'
import packageJson from '../../package.json'
import { PackageJson as PackageJsonType } from 'type-fest'

const WORKSPACES: PackageJsonType['workspaces'] = packageJson?.workspaces || []
export const WORKSPACE_FILTERS = {
  PACKAGES: /packages\//,
  DOCS: /packages\/embla-carousel-docs/
}

export const forEachWorkspace = (
  callback: (workspacePath: string) => void,
  include?: (workspace: string) => boolean
): void => {
  WORKSPACES.forEach((workspace) => {
    if (include && !include(workspace)) return

    const workspacePath = path.join(process.cwd(), workspace)
    callback(workspacePath)
  })
}
