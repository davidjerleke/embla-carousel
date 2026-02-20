import docsPackageJson from '@/../package.json'
import { SANDBOX_REACT_FOLDERS } from '@/content/v9/sandboxes/React/sandbox-react-folders'
import { kebabCaseToPascalCase } from '@/utils/string-casing'
import {
  sandboxLanguageUtils,
  SandboxLanguageType,
  SandboxPluginsType,
  PackageJsonType
} from '@/content/v9/sandboxes/sandbox-utils'

export async function createSandboxReactPackageJson(
  language: SandboxLanguageType,
  id: string,
  plugins?: SandboxPluginsType
): Promise<PackageJsonType> {
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
