import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'

const header: string =
  require('!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Header.jsx').default
// Add tsx too!

export const createSandboxReactHeader = (title: string = ''): string => {
  const formattedTitle = kebabCaseToPascalCase(title, ' ')
  return header.replace('__replace_sandbox_name__', formattedTitle)
}
