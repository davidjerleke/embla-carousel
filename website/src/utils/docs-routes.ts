export async function getDocsPageRoutes(slugOrEmpty?: string[]) {
  //   const contentFolderPath = getContentFolderPath()
  //   const versions = fs
  //     .readdirSync(contentFolderPath)
  //     .filter((version) => version.match(VERSION_REGEX))
  //   return versions.flatMap((version) => {
  //     const pagesDir = getVersionedPageFolderPath(version)
  //     const walk = (version: string, dir?: string): string[][] => {
  //       const directory = dir || pagesDir
  //       return fs.readdirSync(directory).flatMap((file) => {
  //         const filePath = path.join(directory, file)
  //         if (fs.statSync(filePath).isDirectory()) {
  //           return walk(version, filePath)
  //         }
  //         if (file.endsWith('.mdx')) {
  //           const slug = filePath
  //             .replace(pagesDir, '')
  //             .replace('.mdx', '')
  //             .split('/')
  //             .filter(Boolean)
  //           return [slug]
  //         }
  //         return []
  //       })
  //     }
  //     return walk(version).map((slug) => ({ slug: slug || [] }))
  //   })
}
