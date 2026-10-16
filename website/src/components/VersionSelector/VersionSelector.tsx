'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import styled from 'styled-components'
import { CARD_STYLES } from '@/utils/card'
import { SPACINGS } from '@/utils/spacings'
import { BORDER_RADIUSES, BORDER_SIZES } from '@/utils/border'
import { COLORS } from '@/utils/theme'
import { usePathname } from 'next/navigation'
import { DOCS_VERSIONS } from '@/utils/global-data'
import { getVersionFromPathname, getPathnameForVersion } from '@/utils/slug'
import { ButtonBare } from '@/components/Button/ButtonBare'
import { LAYERS } from '@/utils/layers'
import { LinkNavigation } from '@/components/Link/LinkNavigation'
import { useEventListener } from '@/hooks/use-event-listener'
import { useBreakpoints } from '@/hooks/use-breakpoints'
import { FONT_WEIGHTS } from '@/utils/font-sizes'
import { MODAL_CLOSE_KEYS } from '@/utils/modal'
import { useClickOutside } from '@/hooks/use-click-outside'

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownToggle = styled(ButtonBare)`
  ${CARD_STYLES};
  border-radius: ${BORDER_RADIUSES.SOFT};
  padding: ${SPACINGS.ONE} ${SPACINGS.THREE};
  line-height: 1.65;
`

const DropdownToggleLabel = styled.span`
  font-weight: ${FONT_WEIGHTS.BOLD};
  color: ${COLORS.TEXT_LOW_CONTRAST};
`

const DropdownContent = styled.nav`
  position: absolute;
  top: calc(100% + ${SPACINGS.ONE});
  background-color: ${COLORS.BACKGROUND_SITE};
  padding: ${SPACINGS.ONE} 0;
  z-index: ${LAYERS.HEADER};
  width: max-content;
  left: 50%;
  transform: translateX(-50%);
  border-radius: ${BORDER_RADIUSES.CARD};
  border: ${BORDER_SIZES.DETAIL} solid ${COLORS.DETAIL_LOW_CONTRAST};
  display: flex;
  flex-direction: column;

  &[hidden] {
    display: none;
  }
`

const DropdownLink = styled(LinkNavigation)`
  padding: ${SPACINGS.ONE} 0;
  margin-left: ${SPACINGS.THREE};
  margin-right: ${SPACINGS.THREE};
  display: block;
`

type PropType = {}

export function VersionSelector(props: PropType) {
  const { ...restProps } = props
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const currentVersion = getVersionFromPathname(pathname)
  const dropdownToggleId = useId()
  const dropdownContentId = useId()
  const { isCompact } = useBreakpoints()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const onKeyUp = useCallback(
    ({ key }: KeyboardEvent) => {
      if (isDropdownOpen && MODAL_CLOSE_KEYS.includes(key)) {
        setIsDropdownOpen(false)
        toggleRef.current?.focus()
      }
    },
    [isDropdownOpen]
  )

  const onBlur = useCallback(
    ({ relatedTarget }: React.FocusEvent<HTMLDivElement>) => {
      if (!wrapperRef.current?.contains(relatedTarget as Node)) {
        setIsDropdownOpen(false)
      }
    },
    []
  )

  useEffect(() => {
    setIsDropdownOpen(false)
  }, [isCompact])

  useEventListener('keyup', onKeyUp)
  useClickOutside(wrapperRef, () => setIsDropdownOpen(false))

  return (
    <DropdownWrapper ref={wrapperRef} onBlur={onBlur} {...restProps}>
      <div>
        <DropdownToggle
          id={dropdownToggleId}
          aria-expanded={isDropdownOpen}
          aria-controls={dropdownContentId}
          onClick={() => setIsDropdownOpen((isOpen) => !isOpen)}
          type="button"
          ref={toggleRef}
        >
          <DropdownToggleLabel>Version: </DropdownToggleLabel>
          <strong>
            {currentVersion.MAJOR} ({currentVersion.SUFFIX})
          </strong>
        </DropdownToggle>
      </div>

      <DropdownContent
        aria-label="Documentation versions"
        id={dropdownContentId}
        hidden={!isDropdownOpen}
      >
        <ul>
          {DOCS_VERSIONS.map((docsVersion) => {
            const href = getPathnameForVersion(pathname, docsVersion.MAJOR)
            const isCurrentVersion = docsVersion.MAJOR === currentVersion.MAJOR
            const versionLabel = `v${docsVersion.MAJOR}`
            const versionSuffix = docsVersion.SUFFIX
              ? ` (${docsVersion.SUFFIX})`
              : ''

            return (
              <li key={versionLabel}>
                <DropdownLink
                  slug={href}
                  onClick={() => setIsDropdownOpen(false)}
                  isActive={isCurrentVersion}
                  aria-current={isCurrentVersion ? 'page' : undefined}
                >
                  {docsVersion.NAME}
                  {versionSuffix}
                </DropdownLink>
              </li>
            )
          })}
        </ul>
      </DropdownContent>
    </DropdownWrapper>
  )
}
