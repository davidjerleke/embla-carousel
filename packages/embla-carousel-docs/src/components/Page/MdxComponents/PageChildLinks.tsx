import React from 'react'
import { useRouteChildren, useRouteCurrent } from 'hooks'
import { ContentLink } from 'components/Link'

export const PageChildLinks = () => {
  const routeChildren = useRouteChildren(useRouteCurrent())

  if (routeChildren.length === 0) return null

  return (
    <ul>
      {routeChildren.map(({ id, slug, title }) => (
        <li key={id}>
          <ContentLink to={slug}>{title}</ContentLink>
        </li>
      ))}
    </ul>
  )
}
