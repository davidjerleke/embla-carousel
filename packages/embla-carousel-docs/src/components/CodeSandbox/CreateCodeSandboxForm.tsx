import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { contentLinkStyles } from 'components/Link/ContentLink'
import { visuallyHiddenStyles } from 'utils/visuallyHiddenStyles'
import { PlainButton } from 'components/Button/PlainButton'
import { useRoutes } from 'hooks/useRoutes'
import { URLS } from 'consts/urls'

export const FORM_HEIGHT = '2.4rem'

const Submit = styled(PlainButton)`
  ${contentLinkStyles};
  height: ${FORM_HEIGHT};
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  line-height: inherit;
  padding: 0;
`

const SubmitHiddenText = styled.span`
  ${visuallyHiddenStyles};
`

export type PropType = {
  label: string
  createSandbox: () => Promise<string>
}

export const CreateCodeSandboxForm = (props: PropType) => {
  const { label, createSandbox } = props
  const { setIsLoading } = useRoutes()
  const [sandbox, setSandbox] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  const onSumbit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      if (sandbox) return formRef.current?.submit()

      setIsLoading(true)
      const codeSandbox = await createSandbox()
      setSandbox(codeSandbox)
    },
    [sandbox, createSandbox, setIsLoading],
  )

  useEffect(() => {
    if (!sandbox) return
    formRef.current?.submit()
    setIsLoading(false)
    setSandbox('')
  }, [sandbox, setIsLoading])

  return (
    <form
      ref={formRef}
      action={URLS.CODESANDBOX_DEFINE}
      method="POST"
      target="_blank"
      onSubmit={onSumbit}
    >
      <input type="hidden" name="parameters" value={sandbox} />
      <Submit type="submit">
        <SubmitHiddenText>Create</SubmitHiddenText> {label}{' '}
        <SubmitHiddenText>CodeSandbox</SubmitHiddenText>
      </Submit>
    </form>
  )
}
