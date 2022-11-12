import React, { useCallback, useEffect, useState } from 'react'
import { themeStyles } from '../../../packages/embla-carousel-docs/src/consts/themes'
import { resetStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/reset'
import { baseStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/base'
import { fontStyles } from '../../../packages/embla-carousel-docs/src/components/Layout/GlobalStyles/font'
import { SandboxesBasic } from './Sandboxes/Basic'
import { SandboxesNavigation } from './Sandboxes/Navigation'
import { SandboxesInspiration } from './Sandboxes/Inspiration'
import './sandboxes.css'

const SANDBOX_GROUPS = [
  { name: 'Basic', component: SandboxesBasic },
  { name: 'Navigation', component: SandboxesNavigation },
  { name: 'Inspiration', component: SandboxesInspiration },
]

const injectBaseStyles = (): void => {
  const styleElement = document.createElement('style')
  const stylesList = [themeStyles, resetStyles, baseStyles, fontStyles]

  styleElement.innerHTML = stylesList.reduce(
    (allStyles, styles) => allStyles + styles.join(''),
    '',
  )
  styleElement.id = 'baseStyles'
  document.head.appendChild(styleElement)
}

export const Sandboxes = () => {
  const [activeSandboxGroup, setActiveSandboxGroup] = useState<string>(
    SANDBOX_GROUPS[0].name,
  )
  const ActiveSandboxes = SANDBOX_GROUPS.find(
    (group) => group.name === activeSandboxGroup,
  )?.component

  const onSandboxGroupChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setActiveSandboxGroup(event.target.value)
    },
    [],
  )

  useEffect(() => injectBaseStyles(), [])

  return (
    <main className="examples">
      <div className="examples__checkboxes">
        {SANDBOX_GROUPS.map((sandboxGroup) => (
          <label className="examples__checkbox" key={sandboxGroup.name}>
            <input
              type="checkbox"
              checked={sandboxGroup.name === activeSandboxGroup}
              value={sandboxGroup.name}
              onChange={onSandboxGroupChange}
            />
            <span className="examples__checkbox__label">
              {sandboxGroup.name}
            </span>
          </label>
        ))}
      </div>
      <h1 className="examples__h1">React - {activeSandboxGroup}</h1>

      {ActiveSandboxes && <ActiveSandboxes />}
    </main>
  )
}
