import fs from 'fs'
import path from 'path'
import { PackageJson as PackageJsonType } from 'type-fest'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'
import { WORKSPACE_FILTERS, forEachWorkspace } from '../utils/forEachWorkspace'

const ESM_FOLDER_NAME = 'esm'
const CJS_FOLDER_NAME = 'cjs'

try {
  forEachWorkspace(
    (workspacePath) => {
      const packageJsonPath = path.join(workspacePath, 'package.json')
      const workspacePackageJson = fs.readFileSync(packageJsonPath, 'utf-8')

      if (!workspacePackageJson) return

      const esmFolder = path.join(workspacePath, ESM_FOLDER_NAME)
      const cjsFolder = path.join(workspacePath, CJS_FOLDER_NAME)

      const packageJson = JSON.parse(workspacePackageJson)
      const packageJsonMain: PackageJsonType = {
        ...packageJson,
        exports: {
          './package.json': './package.json',
          '.': {
            import: {
              types: `./${ESM_FOLDER_NAME}/index.d.ts`,
              default: `./${ESM_FOLDER_NAME}/${packageJson.name}.${ESM_FOLDER_NAME}.js`
            },
            require: {
              types: `./${CJS_FOLDER_NAME}/index.d.ts`,
              default: `./${CJS_FOLDER_NAME}/${packageJson.name}.${CJS_FOLDER_NAME}.js`
            }
          }
        }
      }
      const files = packageJson.files.filter((file: string) => {
        return !file.match(ESM_FOLDER_NAME) && !file.match(CJS_FOLDER_NAME)
      })
      const packageJsonEsm: PackageJsonType = {
        ...packageJson,
        files,
        type: 'module'
      }
      const packageJsonCjs: PackageJsonType = {
        ...packageJson,
        files,
        type: 'commonjs'
      }

      delete packageJsonEsm.exports
      delete packageJsonEsm.scripts

      delete packageJsonCjs.exports
      delete packageJsonCjs.scripts

      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJsonMain, null, '\t')
      )

      if (!fs.existsSync(esmFolder)) fs.mkdirSync(esmFolder)
      if (!fs.existsSync(cjsFolder)) fs.mkdirSync(cjsFolder)

      fs.writeFileSync(
        path.join(esmFolder, 'package.json'),
        JSON.stringify(packageJsonEsm, null, '\t')
      )

      fs.writeFileSync(
        path.join(cjsFolder, 'package.json'),
        JSON.stringify(packageJsonCjs, null, '\t')
      )

      const esmTypesFilePath = `${esmFolder}/index.d.ts`
      const esmTypesFile = fs.readFileSync(esmTypesFilePath, 'utf-8')
      const esmTypesFileWithExtensions = esmTypesFile.replace(
        /from\s'(.*)';/g,
        (match) => match.replace(/';/g, `.ts';`)
      )
      fs.writeFileSync(esmTypesFilePath, esmTypesFileWithExtensions)
    },
    (workspace) => {
      if (!WORKSPACE_FILTERS.PACKAGES.test(workspace)) return false
      if (WORKSPACE_FILTERS.EXCLUDE.test(workspace)) return false
      return true
    }
  )

  console.log(
    CONSOLE_FONT_COLORS.SUCCESS,
    `SUCCESS: Nodenext support succesfully added to all packages.`
  )
} catch (error) {
  console.log(CONSOLE_FONT_COLORS.ERROR, error)
}
