import { escapeRegExp } from '../utils/escape-reg-exp'

const EMPTY_LINE_REGEX = /^\s*\n/gm
const PRESERVE_EMPTY_LINE_COMMENT = `/* The TypeScript compiler won't clear this empty line! */`
const PRESERVE_EMPTY_LINE_REGEX = escapeRegExp(PRESERVE_EMPTY_LINE_COMMENT)

export function preserveEmptyLinesStart(content: string): string {
  return content.replace(EMPTY_LINE_REGEX, `${PRESERVE_EMPTY_LINE_COMMENT} \n`)
}

export function preserveEmptyLinesEnd(content: string): string {
  return content.replace(new RegExp(PRESERVE_EMPTY_LINE_REGEX, 'gm'), '')
}
