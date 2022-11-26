export const createSandboxVanillaTsDeclarations = async (): Promise<string> => {
  const declarations = await import(
    '!!raw-loader!embla-carousel-vanilla-sandboxes/src/SandboxFilesDist/declarations.d.ts'
  )
  return declarations.default
}
