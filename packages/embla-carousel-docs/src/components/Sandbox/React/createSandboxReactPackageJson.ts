import docsPackageJson from 'embla-carousel-docs/package.json'
import { SANDBOX_REACT_FOLDERS } from './sandboxReactFolders'
import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'
import { sandboxLanguageUtils } from 'utils/sandbox'
import {
  SandboxLanguageType,
  SandboxPluginsType,
  PackageJsonType
} from 'consts/sandbox'

export const createSandboxReactPackageJson = async (
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType
): Promise<PackageJsonType> => {
  const { dependencies, devDependencies } = docsPackageJson
  const { isJavaScript, reactScriptExtension } = await sandboxLanguageUtils(
    language
  )

  return {
    name: id,
    version: '1.0.0',
    description: `${kebabCaseToPascalCase(id, ' ')} Example`,
    main: `${SANDBOX_REACT_FOLDERS.JS}/index.${reactScriptExtension}`,
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test --env=jsdom',
      eject: 'react-scripts eject'
    },
    dependencies: {
      react: dependencies.react,
      'react-dom': dependencies['react-dom'],
      'react-scripts': '4.0.0',
      'embla-carousel-react': dependencies['embla-carousel-react'],
      'embla-carousel': dependencies['embla-carousel'],
      ...(plugins && plugins)
    },
    devDependencies: isJavaScript
      ? { '@babel/runtime': '7.13.8' }
      : {
          '@types/react': devDependencies['@types/react'],
          '@types/react-dom': devDependencies['@types/react-dom'],
          typescript: devDependencies.typescript
        },
    browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all']
  }
}
