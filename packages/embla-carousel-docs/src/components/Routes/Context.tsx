import React, { createContext, PropsWithChildren, useMemo } from 'react'
import { createHierarchicalRoutes, createFlatRoutes } from 'utils'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query AllRoutesQuery {
    allMdx(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: {
        frontmatter: { title: { ne: "404" } }
        fields: { slug: { ne: "/404/" } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            order
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export type MdxAllRoutesType = {
  allMdx: {
    edges: {
      node: {
        id: string
        fields: { slug: string }
        frontmatter: {
          title: string
          order: number
        }
      }
    }[]
  }
}

export type RouteType = {
  id: string
  slug: string
  title: string
  level: number
  order: number
  children: RouteType[]
}

export type RoutesContextType = {
  hierarchical: RouteType[]
  flat: RouteType[]
}

export const RoutesContext = createContext<RoutesContextType>({
  hierarchical: [],
  flat: [],
})

type PropType = PropsWithChildren<{}>

export const RoutesProvider = (props: PropType) => {
  const { children } = props
  const data = useStaticQuery<MdxAllRoutesType>(query)
  const value = useMemo(
    () => ({
      hierarchical: createHierarchicalRoutes(data),
      flat: createFlatRoutes(data),
    }),
    [data],
  )

  return (
    <RoutesContext.Provider value={value}>{children}</RoutesContext.Provider>
  )
}
