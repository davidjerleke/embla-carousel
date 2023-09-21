import { Endpoints } from '@octokit/types'

const EXCLUDE_CONTRIBUTORS = ['dependabot[bot]', 'dependabot-preview[bot]']

export type ContributorsResponseType =
  Endpoints['GET /repos/{owner}/{repo}/contributors']['response']['data']

export const createContributors = (
  contributors?: ContributorsResponseType
): string => {
  const contributorsOrEmptyArray = contributors || []

  return contributorsOrEmptyArray.reduce((allContributors, contributor) => {
    const { id, login } = contributor
    if (!id || !login) return allContributors
    if (EXCLUDE_CONTRIBUTORS.includes(login)) return allContributors

    const contributorMarkup = `
    <a href="https://github.com/${login}">
      <img src="https://avatars2.githubusercontent.com/u/${id}?s=120&v=4" title="${login}" width="50" height="50" style="max-width: 100%" />
    </a>
    `

    return allContributors + contributorMarkup.trim()
  }, '')
}
