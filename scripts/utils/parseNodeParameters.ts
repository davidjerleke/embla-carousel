export const parseNodeParameters = (): { [key: string]: string } => {
  return process.argv
    .slice(2)
    .filter((arg) => /^--/.test(arg))
    .reduce((args, arg) => {
      const [key, value] = arg.replace(/^--/, '').split('=')
      return { ...args, [key]: value }
    }, {})
}
