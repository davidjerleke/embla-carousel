import packageJson from '@/../package.json'

/* CONSTS */
export const LATEST_VERSION = `v${packageJson.version.split('.')[0]}`
export const VERSION_REGEX = /^v\d+$/
