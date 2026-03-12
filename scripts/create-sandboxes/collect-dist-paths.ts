import fs from 'fs'
import path from 'path'

export function collectSandboxDistPaths(
  contentPath: string,
  sandboxFilesDist: string,
  result: string[] = []
): string[] {
  fs.readdirSync(contentPath, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) return

    const entryPath = path.join(contentPath, entry.name)

    if (entry.name === sandboxFilesDist) {
      result.push(entryPath)
      return
    }

    collectSandboxDistPaths(entryPath, sandboxFilesDist, result)
  })
  return result
}
