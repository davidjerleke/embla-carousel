import type { Endpoints } from '@octokit/types'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'

const EXCLUDE_CONTRIBUTORS = ['dependabot[bot]', 'dependabot-preview[bot]']

export type ContributorsResponseType =
  Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data']

const fetchContributors = async (
  owner: string,
  repo: string
): Promise<ContributorsResponseType> => {
  if (!process.env.GITHUB_TOKEN) {
    console.log(
      CONSOLE_FONT_COLORS.WARNING,
      'WARNING: No GITHUB_TOKEN found. Using anonymous requests (limited to 60/hour)'
    )
  }

  const { Octokit } = await import('@octokit/rest')
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const contributors: ContributorsResponseType = []
  const results = await octokit.paginate(octokit.rest.repos.listContributors, {
    owner,
    repo,
    per_page: 100
  })

  contributors.push(...results)
  return contributors
}

const createContributor = (
  allContributors: string,
  contributor: ContributorsResponseType[number]
): string => {
  const { id, login } = contributor
  if (!id || !login) return allContributors
  if (EXCLUDE_CONTRIBUTORS.includes(login)) return allContributors

  const contributorMarkup = `
  <a href="https://github.com/${login}">
    <img src="https://avatars2.githubusercontent.com/u/${id}?s=120&v=4" title="${login}" width="50" height="50" style="max-width: 100%" />
  </a>
  `

  return allContributors + contributorMarkup.trim()
}

export const createContributors = async (
  owner: string,
  repo: string
): Promise<string> => {
  const contributors = await fetchContributors(owner, repo)
  const contributorsOrEmptyArray = contributors || []

  return contributorsOrEmptyArray.reduce(createContributor, '')
}
