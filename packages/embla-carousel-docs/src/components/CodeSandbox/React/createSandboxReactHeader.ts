import { kebabCaseToPascalCase } from 'utils/kebabCaseToPascalCase'

export const createSandboxReactHeader = async (
  title: string = '',
): Promise<string> => {
  const header = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/Header.jsx'
  )
  // Add tsx too!

  const formattedTitle = kebabCaseToPascalCase(title, ' ')
  return header.default.replace('__replace_sandbox_name__', formattedTitle)
}
