import { JSXElementConstructor, ReactElement } from 'react'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'

// TODO: Remove all local node_module folders for all packages
// TODO: Run yarn install
// TODO: Test yarn workspace embla-carousel-website dev

const VERSION_REGEX = /^v\d+$/
const CONTENT_FOLDER_NAME = 'content'
const PAGES_FOLDER_NAME = 'pages'
const LATEST_VERSION = 'v9' // TODO: Get latest version from package.json

export async function getVersionedRoutes(slugOrEmpty?: string[]) {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const version = slugIncludesVersion ? slug[0] : LATEST_VERSION

  // TODO: Build flat tree of routes for the version
}

export async function resolveDocPage(
  slugOrEmpty?: string[]
): Promise<ReactElement<unknown, string | JSXElementConstructor<any>>> {
  const slug = slugOrEmpty || []
  const slugIncludesVersion = slug[0]?.match(VERSION_REGEX)
  const slugIsLatestVersion = slug[0] === LATEST_VERSION

  if (slugIsLatestVersion) {
    notFound()
  }

  const slugWithVersion = slugIncludesVersion ? slug : [LATEST_VERSION, ...slug]
  const version = slugWithVersion[0]

  const basePath = path.join(
    process.cwd(),
    'src',
    CONTENT_FOLDER_NAME,
    version,
    PAGES_FOLDER_NAME
  )

  console.log(basePath, 'basePath')

  let filePath = ''

  if (slugWithVersion.length === 1) {
    filePath = path.join(basePath, 'index.mdx')
  } else {
    const pathToFind = slugWithVersion.slice(1).join('/')
    const mdxFile = path.join(basePath, `${pathToFind}.mdx`)
    const indexFile = path.join(basePath, `${pathToFind}/index.mdx`)

    const doesMdxFileExist = fs.existsSync(mdxFile)
    const doesIndexFileExist = !doesMdxFileExist && fs.existsSync(indexFile)

    if (doesMdxFileExist) {
      filePath = mdxFile
    }
    if (doesIndexFileExist) {
      filePath = indexFile
    }
  }

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { content } = await compileMDX({ source })
  return content
}

export async function docPageStaticParams() {
  const versions = fs
    .readdirSync(path.join(process.cwd(), 'src', CONTENT_FOLDER_NAME))
    .filter((version) => version.match(VERSION_REGEX))

  return versions.flatMap((version) => {
    const pagesDir = path.join(
      process.cwd(),
      'src',
      CONTENT_FOLDER_NAME,
      version,
      PAGES_FOLDER_NAME
    )
    const walk = (version: string, dir?: string): string[][] => {
      const directory = dir || pagesDir

      return fs.readdirSync(directory).flatMap((file) => {
        const fullPath = path.join(directory, file)

        if (fs.statSync(fullPath).isDirectory()) {
          return walk(version, fullPath)
        }

        if (file.endsWith('.mdx')) {
          const slug = fullPath
            .replace(pagesDir, '')
            .replace('.mdx', '')
            .split('/')
            .filter(Boolean)

          return [slug]
        }

        return []
      })
    }

    return walk(version).map((slug) => {
      return { version, slug }
    })
  })
}
