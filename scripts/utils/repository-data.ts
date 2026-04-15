import packageJson from '../../package.json'
import { escapeRegExp } from './escape-reg-exp'

const REPO_PATH_REGEX = new RegExp(escapeRegExp('git+https://github.com/'))
const REPO_PATH = packageJson.repository.url.replace(REPO_PATH_REGEX, '')
const [REPO_OWNER, REPO_NAME] = REPO_PATH.split('/')

export { REPO_OWNER, REPO_NAME }
