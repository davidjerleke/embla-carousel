import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createSandboxReactPackageJson } from '../createSandboxReactPackageJson'
import { createSandboxReact } from '../createSandboxReact'
import { useRoutes } from 'hooks/useRoutes'

const CarouselJs: string =
  require('!!raw-loader!embla-carousel-react-sandboxes/src/SandboxFilesDist/CarouselDefault.jsx').default

const packageJson = createSandboxReactPackageJson({
  name: 'embla-carousel-react-default',
})

export const createSandboxReactDefault = (): Promise<string> =>
  createSandboxReact(packageJson, CarouselJs)

export const CreateSandboxReactDefault = () => {
  const { setIsLoading } = useRoutes()
  const [sandbox, setSandbox] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const onSumbit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      if (sandbox) return formRef.current?.submit()

      setIsLoading(true)
      const codeSandbox = await createSandboxReactDefault()
      setSandbox(codeSandbox)
    },
    [sandbox, setIsLoading],
  )

  useEffect(() => {
    if (!sandbox) return
    formRef.current?.submit()
    setIsLoading(false)
  }, [sandbox, setIsLoading])

  return (
    <form
      ref={formRef}
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      onSubmit={onSumbit}
    >
      <input type="hidden" name="parameters" value={sandbox} />
      <input type="submit" value="Open in sandbox" />
    </form>
  )
}
