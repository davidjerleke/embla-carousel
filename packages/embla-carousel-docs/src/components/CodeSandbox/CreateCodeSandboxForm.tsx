import React from 'react'

type PropType = {
  createSandbox: () => string
}

export const CreateCodeSandboxForm = (props: PropType) => {
  const { createSandbox } = props

  return (
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
    >
      <input type="hidden" name="parameters" value={createSandbox()} />
      <input type="submit" value="Open in sandbox" />
    </form>
  )
}
