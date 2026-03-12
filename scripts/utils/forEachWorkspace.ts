import path from 'path'
import packageJson from '../../package.json'

const WORKSPACES = packageJson?.workspaces || []
export const WORKSPACE_FILTERS = {
  PACKAGES: /packages\//,
  DOCS: /website/
}

export function forEachWorkspace(
  callback: (workspacePath: string) => void,
  include?: (workspace: string) => boolean
): void {
  WORKSPACES.forEach((workspace) => {
    if (include && !include(workspace)) return

    const workspacePath = path.join(process.cwd(), workspace)
    callback(workspacePath)
  })
}
