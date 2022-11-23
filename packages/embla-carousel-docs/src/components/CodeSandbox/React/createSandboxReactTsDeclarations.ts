export const createSandboxReactTsDeclarations = async (): Promise<string> => {
  const declarations = await import(
    '!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/declarations.d.ts'
  )
  return declarations.default
}
