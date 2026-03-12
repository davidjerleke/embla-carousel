import docsPackageJson from '@root/package.json'
import { SANDBOX_REACT_FOLDERS } from '@/content/v8/sandboxes/React/sandbox-react-folders'
import { kebabCaseToPascalCase } from '@/utils/string-casing'
import {
  sandboxLanguageUtils,
  SandboxLanguageType,
  SandboxPluginsType,
  PackageJsonType,
  getSandboxVersion
} from '@/content/v8/sandboxes/sandbox-utils'

export async function createSandboxReactPackageJson(
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType
): Promise<PackageJsonType> {
  const version = getSandboxVersion()
  const { devDependencies } = docsPackageJson
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
      react: '18.3.1',
      'react-dom': '18.3.1',
      'react-scripts': '4.0.0',
      'embla-carousel-react': version,
      'embla-carousel': version,
      ...(plugins && plugins)
    },
    devDependencies: isJavaScript
      ? { '@babel/runtime': '7.13.8' }
      : {
          '@types/react': '18.3.18',
          '@types/react-dom': '18.3.5',
          typescript: devDependencies.typescript
        },
    browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all']
  }
}
