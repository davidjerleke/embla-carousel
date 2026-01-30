import { resolveHomePage } from '@/utils/home-page'

export default async function HomePage() {
  const content = await resolveHomePage()

  return <article>{content}</article>
}
