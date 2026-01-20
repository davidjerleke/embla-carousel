import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import packageJson from '../../package.json'
import { createReadme } from './create-readme'
import { parseNodeParameters } from '../utils/parseNodeParameters'
import { escapeRegExp } from '../utils/escapeRegExp'
import { CONSOLE_FONT_COLORS } from '../utils/consoleFontColors'
import { WORKSPACE_FILTERS, forEachWorkspace } from '../utils/forEachWorkspace'
import { createContributors } from './create-contributors'
import { createSponsors } from './create-sponsors'

config({
  path: path.resolve(process.cwd(), '.env')
})

const REPO_PATH_REGEX = new RegExp(escapeRegExp('git+https://github.com/'))
const REPO_PATH = packageJson.repository.url.replace(REPO_PATH_REGEX, '')
const [REPO_OWNER, REPO_NAME] = REPO_PATH.split('/')

async function main() {
  try {
    const { templatePath } = parseNodeParameters()

    if (!templatePath) {
      console.log(
        CONSOLE_FONT_COLORS.ERROR,
        'ERROR: Readme template path not provided.'
      )
      throw new Error()
    }

    const templateFilePath = path.join(process.cwd(), templatePath)
    const template = fs.readFileSync(templateFilePath, 'utf-8')
    const contributorMarkup = await createContributors(REPO_OWNER, REPO_NAME)
    const { currentSponsorsMarkup, pastSponsorsMarkup } = await createSponsors(
      REPO_OWNER
    )

    createReadme(
      template,
      '',
      contributorMarkup,
      currentSponsorsMarkup,
      pastSponsorsMarkup
    )

    forEachWorkspace(
      (workspacePath) => {
        createReadme(
          template,
          workspacePath,
          contributorMarkup,
          currentSponsorsMarkup,
          pastSponsorsMarkup
        )
      },
      (workspace) => WORKSPACE_FILTERS.PACKAGES.test(workspace)
    )

    console.log(
      CONSOLE_FONT_COLORS.SUCCESS,
      `SUCCESS: README.md's created succesfully for all packages.`
    )
  } catch (error) {
    console.log(CONSOLE_FONT_COLORS.ERROR, error)
  }
}

main()
