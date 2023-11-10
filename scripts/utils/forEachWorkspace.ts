import path from 'path'
import { PackageJson as PackageJsonType } from 'type-fest'
import packageJson from '../../package.json'

const WORKSPACES: PackageJsonType['workspaces'] = packageJson?.workspaces || []
export const WORKSPACE_FILTERS = {
  PACKAGES: /packages\//,
  EXCLUDE: /(packages\/embla-carousel-docs)|(embla-carousel-angular)/
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
