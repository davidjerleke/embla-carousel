import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useInView } from 'react-intersection-observer'
import { LoadSpinnerSuspense } from 'components/LoadSpinner/LoadSpinnerSuspense'
import { SandboxSelection } from 'components/Sandbox/SandboxSelection'
import {
  EXAMPLES_WRAPPER_STYLES,
  EXAMPLES_WRAPPERS,
  ExamplesModuleType,
  EXAMPLES_INTERSECTION_OPTIONS,
  ExamplesWrapperType,
  ExamplesSetupType
} from 'consts/examples'

const EMPTY_EXAMPLE: ExamplesSetupType = {
  config: { id: '', slides: [], options: {}, styles: '' },
  sandboxes: [],
  Carousel: undefined
}

const Wrapper = styled.div<{
  $id: string
  $styles: string
  $wrapper: ExamplesWrapperType
}>`
  ${({ $id, $styles, $wrapper }) =>
    css`
      ${EXAMPLES_WRAPPER_STYLES[$wrapper]};

      &.${$id} {
        ${$styles};
      }
    `}
`

type PropType = {
  loader: () => Promise<ExamplesModuleType>
  wrapper: ExamplesWrapperType
}

export const ExamplesLazy = (props: PropType) => {
  const { wrapper, loader } = props
  const [inViewRef, inView] = useInView(EXAMPLES_INTERSECTION_OPTIONS)
  const [isLoading, setIsLoading] = useState(false)
  const [example, setExample] = useState<ExamplesSetupType>(EMPTY_EXAMPLE)
  const wrapperOrFallback = wrapper || EXAMPLES_WRAPPERS.DEFAULT

  const loadExample = useCallback(async (loader: PropType['loader']) => {
    setIsLoading(true)
    const module = await loader()
    const { EXAMPLE } = module
    if (EXAMPLE) setExample(EXAMPLE)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!inView || !loader) return
    loadExample(loader)
  }, [inView, loader])

  return (
    <>
      <SandboxSelection sandboxes={example.sandboxes} />

      <Wrapper
        className={example.config.id}
        ref={inViewRef}
        $id={example.config.id}
        $styles={example.config.styles}
        $wrapper={wrapperOrFallback}
      >
        {inView ? (
          <>
            <LoadSpinnerSuspense usePortal={false} isVisible={isLoading} />

            {example.Carousel && (
              <example.Carousel
                options={example.config.options}
                slides={example.config.slides}
              />
            )}
          </>
        ) : null}
      </Wrapper>
    </>
  )
}
