import fs from 'fs'
import path from 'path'

export function cleanExistingSandboxDist(
  contentPath: string,
  sandboxFilesDist: string
): void {
  fs.readdirSync(contentPath, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) return
    emptySandboxFilesDist(path.join(contentPath, entry.name), sandboxFilesDist)
  })
}

function emptySandboxFilesDist(
  dirPath: string,
  sandboxFilesDist: string
): void {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) return

    const entryPath = path.join(dirPath, entry.name)

    if (entry.name === sandboxFilesDist) {
      fs.rmSync(entryPath, { recursive: true, force: true })
      fs.mkdirSync(entryPath)
      return
    }

    emptySandboxFilesDist(entryPath, sandboxFilesDist)
  })
}
