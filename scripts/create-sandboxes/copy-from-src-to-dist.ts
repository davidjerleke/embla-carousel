import fs from 'fs'
import path from 'path'

export function copySandboxesFromSrcToDist(
  contentPath: string,
  sandboxFilesSrc: string,
  sandboxFilesDist: string
): void {
  fs.readdirSync(contentPath, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) return
    findAndCopySandboxFiles(
      path.join(contentPath, entry.name),
      sandboxFilesSrc,
      sandboxFilesDist
    )
  })
}

function findAndCopySandboxFiles(
  dirPath: string,
  sandboxFilesSrc: string,
  sandboxFilesDist: string
): void {
  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory()) return

    const entryPath = path.join(dirPath, entry.name)

    if (entry.name === sandboxFilesSrc) {
      const distPath = path.join(dirPath, sandboxFilesDist)
      copyDirectory(entryPath, distPath)
      return
    }

    findAndCopySandboxFiles(entryPath, sandboxFilesSrc, sandboxFilesDist)
  })
}

function copyDirectory(srcPath: string, destPath: string): void {
  fs.mkdirSync(destPath, { recursive: true })

  fs.readdirSync(srcPath, { withFileTypes: true }).forEach((entry) => {
    const srcEntry = path.join(srcPath, entry.name)
    const destEntry = path.join(destPath, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(srcEntry, destEntry)
    } else {
      fs.copyFileSync(srcEntry, destEntry)
    }
  })
}
