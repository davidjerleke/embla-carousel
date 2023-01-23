import React, {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react'
import { createHierarchicalRoutes } from 'utils/createHierarchicalRoutes'
import { createFlatRoutes } from 'utils/createFlatRoutes'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query AllRoutesQuery {
    allMdx(
      sort: { frontmatter: { order: ASC } }
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
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const RoutesContext = createContext<RoutesContextType>({
  hierarchical: [],
  flat: [],
  isLoading: false,
  setIsLoading: () => undefined,
})

type PropType = PropsWithChildren<{}>

export const RoutesProvider = (props: PropType) => {
  const { children } = props
  const data = useStaticQuery<MdxAllRoutesType>(query)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const value = useMemo(
    () => ({
      hierarchical: createHierarchicalRoutes(data),
      flat: createFlatRoutes(data),
      isLoading,
      setIsLoading,
    }),
    [data, isLoading],
  )

  return (
    <RoutesContext.Provider value={value}>{children}</RoutesContext.Provider>
  )
}
