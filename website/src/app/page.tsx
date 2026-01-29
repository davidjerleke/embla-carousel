import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'

export default async function HomePage() {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'src', 'content', 'shared', 'pages', 'home.mdx'),
    'utf8'
  )

  const { content } = await compileMDX({ source })

  return <article>{content}</article>
}
