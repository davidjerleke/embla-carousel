export const SANDBOX_REGEX_OPTIONS =
  /((?<=EmblaOptionsType\s\=\s)(.*))|((?<=OPTIONS\s\=\s)(.*))/

export const SANDBOX_REGEX_LANGUAGE_EXTENSION =
  /__replace_sandbox_language_extension__/g

export const SANDBOX_REGEX_REPOSITORY_URL =
  /__replace_sandbox_repository_url__/g

export const SANDBOX_REGEX_IOS_PICKER_LOOP = /((?<=LOOP\s\=\s)(true|false))/

export const SANDBOX_REGEX_IMAGE_IMPORT = /(?<=from\s')(.*)(?=\/images)/g

export const SANDBOX_REGEX_TITLE = /__replace_sandbox_title__/g

export const SANDBOX_REGEX_THEME = /__replace_sandbox_theme__/g

export const SANDBOX_REGEX_CODE = /__replace_sandbox_code__/g
