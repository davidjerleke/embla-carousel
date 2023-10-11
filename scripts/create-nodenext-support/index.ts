import fs from 'fs'
import path from 'path'
import { PackageJson as PackageJsonType } from 'type-fest'
import { WORKSPACE_FILTERS, forEachWorkspace } from '../utils/forEachWorkspace'
import { readFiles } from '../utils/readFiles'

try {
  forEachWorkspace(WORKSPACE_FILTERS.PACKAGES, (workspacePath) => {
    const packageJsonPath = path.join(workspacePath, 'package.json')
    const workspacePackageJson = fs.readFileSync(packageJsonPath, 'utf-8')

    if (!workspacePackageJson) return

    const packageJson = JSON.parse(workspacePackageJson)
    const packageJsonMain: PackageJsonType = {
      ...packageJson,
      exports: {
        '.': {
          import: {
            default: `./esm/${packageJson.name}.esm.js`,
            types: './esm/index.d.ts'
          },
          require: {
            default: `./cjs/${packageJson.name}.cjs.js`,
            types: './cjs/index.d.ts'
          }
        }
      }
    }
    const packageJsonEsm: PackageJsonType = {
      ...packageJson,
      type: 'module'
    }
    const packageJsonCjs: PackageJsonType = {
      ...packageJson,
      type: 'commonjs'
    }

    readFiles(
      `${workspacePath}/`,
      (filename, fileContent) => {
        // Replace package.json at root with packageJsonMain
        // Move packageJsonEsm <package>.esm.js.map to esm folder
        // Move packageJsonCjs and <package>.cjs.js.map to cjs folder
        // Move index.d.ts to esm and cjs folder
      },
      (error) => {
        throw error
      }
    )
  })
} catch (error) {}
