'use client'

import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { CARD_STYLES } from '@/utils/card'
import { SPACINGS } from '@/utils/spacings'
import { BORDER_RADIUSES } from '@/utils/border'
import { FONT_SIZES, FONT_WEIGHTS } from '@/utils/font-sizes'
import { COLORS } from '@/utils/theme'
import { usePathname, useRouter } from 'next/navigation'
import { DOCS_VERSIONS } from '@/utils/global-data'
import { setRoutesLoading } from '@/components/Routes/routes-reducer'
import { useAppDispatch } from '@/hooks/redux'
import { getVersionFromPathname, getPathnameForVersion } from '@/utils/slug'

const VersionSelectorWrapper = styled.div`
  ${CARD_STYLES};
  display: inline-flex;
  align-items: center;
  padding: ${SPACINGS.ONE} ${SPACINGS.THREE};
  border-radius: ${BORDER_RADIUSES.SOFT};
  font-size: ${FONT_SIZES.COMPLEMENTARY};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

const VersionSelectorKey = styled.label`
  font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
  margin-right: ${SPACINGS.ONE};
`

const VersionSelect = styled.select`
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
  cursor: pointer;
  font-weight: ${FONT_WEIGHTS.SEMI_BOLD};
  outline: none;

  &::-ms-expand {
    display: none;
  }
`

type PropType = {}

export function VersionSelector(props: PropType) {
  const { ...restProps } = props
  const router = useRouter()
  const pathname = usePathname()
  const version = getVersionFromPathname(pathname)
  const dispatch = useAppDispatch()

  const onVersionChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const major = Number(event.target.value)
      const nextPathname = getPathnameForVersion(pathname, major)

      if (nextPathname === pathname) return
      dispatch(setRoutesLoading(true))
      router.push(nextPathname)
    },
    [pathname, router, dispatch]
  )

  return (
    <VersionSelectorWrapper {...restProps}>
      <VersionSelectorKey htmlFor="version">Version:</VersionSelectorKey>

      <VersionSelect
        aria-label="Select documentation version"
        value={String(version.MAJOR)}
        name="version"
        id="version"
        onChange={onVersionChange}
      >
        {DOCS_VERSIONS.map((docsVersion) => {
          const versionLabel = `v${docsVersion.MAJOR}`
          const versionSuffix = docsVersion.SUFFIX
            ? ` (${docsVersion.SUFFIX})`
            : ''

          return (
            <option key={versionLabel} value={docsVersion.MAJOR}>
              {versionLabel}
              {versionSuffix}
            </option>
          )
        })}
      </VersionSelect>
    </VersionSelectorWrapper>
  )
}
