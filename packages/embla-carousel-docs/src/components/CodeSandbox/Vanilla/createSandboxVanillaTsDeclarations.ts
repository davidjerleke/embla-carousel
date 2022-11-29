export const createSandboxVanillaTsDeclarations = async (): Promise<string> => {
  const declarations = await import(
    '!!raw-loader!components/CodeSandbox/Vanilla/SandboxFilesDist/declarations.d.ts'
  )
  return declarations.default
}
