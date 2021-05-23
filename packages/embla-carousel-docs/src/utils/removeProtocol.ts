export const removeProtocol = (url: string): string =>
  url.replace(/(^\w+:|^)\/\//, '')
