export const createSandboxReactTsDeclarations = async (): Promise<string> => {
  const declarations = await import(
    '!!raw-loader!components/CodeSandbox/React/SandboxFilesDist/declarations.d.ts'
  )
  return declarations.default
}
