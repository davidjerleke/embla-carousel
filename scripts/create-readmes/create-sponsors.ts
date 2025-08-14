import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'

type SponsorMarkupByGroupType = {
  pastSponsorsMarkup: string
  currentSponsorsMarkup: string
}

type SponsorsResponseType = {
  sponsorEntity: {
    __typename: 'User' | 'Organization'
    login: string
    name: string | null
    url: string
    avatarUrl: string
  }
  isActive: boolean
  createdAt: string
}[]

const fetchSponsors = async (owner: string): Promise<SponsorsResponseType> => {
  if (!process.env.GITHUB_TOKEN) {
    console.log(
      CONSOLE_FONT_COLORS.WARNING,
      `WARNING: No GITHUB_TOKEN found. Can't fetch sponsors.`
    )

    return []
  }

  const sponsors: SponsorsResponseType = []
  const { graphql } = await import('@octokit/graphql')
  const client = graphql.defaults({
    headers: {
      authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })

  let cursor: string | null = null

  while (true) {
    const { user } = await client<{
      user: {
        sponsorshipsAsMaintainer: {
          nodes: SponsorsResponseType
          pageInfo: { hasNextPage: boolean; endCursor: string }
        }
      }
    }>(
      `
      query ($login: String!, $cursor: String) {
        user(login: $login) {
          sponsorshipsAsMaintainer(
            first: 100,
            after: $cursor,                 # ← use the cursor here
            includePrivate: true,
            orderBy: {field: CREATED_AT, direction: ASC},
            activeOnly: false
          ) {
            nodes {
              sponsorEntity {
                __typename
                ... on User {
                  login
                  name
                  url
                  avatarUrl
                }
                ... on Organization {
                  login
                  name
                  url
                  avatarUrl
                }
              }
              isActive
              createdAt
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `,
      {
        login: owner,
        cursor
      }
    )

    sponsors.push(...user.sponsorshipsAsMaintainer.nodes)

    if (!user.sponsorshipsAsMaintainer.pageInfo.hasNextPage) break
    cursor = user.sponsorshipsAsMaintainer.pageInfo.endCursor
  }

  return sponsors
}

const createSponsor = (
  allSponsors: string,
  sponsor: SponsorsResponseType[number]
): string => {
  const { isActive } = sponsor
  const { url, avatarUrl, login } = sponsor.sponsorEntity
  if (!url) return allSponsors

  const imageSize = isActive ? 100 : 50
  const sponsorMarkup = `
  <a href="${url}">
    <img src="${avatarUrl}" title="${login}" width="${imageSize}" height="${imageSize}" style="max-width: 100%" />
  </a>
  `

  return allSponsors + sponsorMarkup.trim()
}

export const createSponsors = async (
  owner: string
): Promise<SponsorMarkupByGroupType> => {
  const sponsors = await fetchSponsors(owner)
  const sponsorsOrEmptyArray = sponsors || []

  const currentSponsorsMarkup = sponsorsOrEmptyArray
    .filter((sponsor) => sponsor.isActive)
    .reduce(createSponsor, '')

  const pastSponsorsMarkup = sponsorsOrEmptyArray
    .filter((sponsor) => !sponsor.isActive)
    .reduce(createSponsor, '')

  return {
    currentSponsorsMarkup,
    pastSponsorsMarkup
  }
}
